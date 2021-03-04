const { Readable } = require("stream");
const { spawn } = require("child_process");
const fs = require("fs").promises;
const md = require("markdown-ast");
const nearley = require("nearley");
const k9grammar = require("./k9_grammar.js");

async function execK(code) {
  try {
    const child = spawn("k");
    Readable.from(code).pipe(child.stdin);
    let lines = "";
    for await (const line of child.stdout) {
      lines += line;
    }
    return { result: lines };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}

function parseK(code) {
  try {
    const k9parser = new nearley.Parser(
      nearley.Grammar.fromCompiled(k9grammar)
    );
    k9parser.feed(code);
    return k9parser.results;
  } catch (e) {
    console.error(e);
    return code;
  }
}

function kToHtml(nodes) {
  const span = (clazz, c) => `<span class="k9 ${clazz}">${c}</span>`;

  if (Array.isArray(nodes)) {
    return nodes.map((node) => kToHtml(node)).join("");
  } else {
    const node = nodes;
    if (!node?.type) {
      switch (node) {
        case "{":
          return span("bracket", node);
        case "}":
          return span("bracket", node);
        case "[":
          return span("bracket", node);
        case "]":
          return span("bracket", node);
        case ")":
          return span("bracket", node);
        case "(":
          return span("bracket", node);
        case ";":
          return span("bracket", node);
        case "~":
          return span("op", node);
        case "*":
          return span("op", node);
        case "'":
          return span("op", node);
        case "+":
          return span("op", node);
        case "_":
          return span("op", node);
        default:
          return node;
      }
    }

    switch (node.type) {
      case "comment":
        return (
          kToHtml(node.data[0]) + span("comment", kToHtml(node.data.slice(1)))
        );
      case "num":
        return span("lit", kToHtml(node.data));
      case "string":
        return span("lit", kToHtml(node.data));
      case "args":
        return span(node.type, kToHtml(node.data));
      case "ref":
      case "def":
      case "intparse":
      case "monadic":
      case "par":
      case "dyadic":
      case "dyadic":
      case "fun":
      case "apply":
      case "cond":
      case "stdin":
      default:
        return span(node.type, kToHtml(node.data));
    }
  }
}

async function nodeToHtml(node) {
  switch (node.type) {
    case "list":
      return `<li>${await blockToHtml(node.block)}</li>`;

    case "title":
      switch (node.rank) {
        case 1:
          return `<h1>${await blockToHtml(node.block)}</h1>`;
        case 2:
          return `<h2>${await blockToHtml(node.block)}</h2>`;
        case 3:
          return `<h3>${await blockToHtml(node.block)}</h3>`;
        default:
          return `<h4>${await blockToHtml(node.block)}</h4>`;
      }
    case "bold":
      return `<b>${
        node.block.length === 1 && node.block[0].type === "text"
          ? node.block[0].text
          : await blockToHtml(node.block)
      }</b>`;
    case "italic":
      return `<i>${
        node.block.length === 1 && node.block[0].type === "text"
          ? node.block[0].text
          : await blockToHtml(node.block)
      }</i>`;
    case "text":
      return node.text;
    case "quote":
      return `<blockquote>${await blockToHtml(node.block)}</blockquote>`;
    case "image":
      return `<img src="${node.url}" alt="${node.alt}"/>`;
    case "break":
      return `<br>`;
    case "codeBlock":
      if (node.syntax === "k") {
        const k9 = node.code.split("\n").map((l) => {
          const nodes = parseK(l);
          if (!nodes.length) {
            return `<div class="k9 line no-parse">${l}</div>`;
          }
          const firstBranch = nodes[0]; // resolve ambiguity :)
          if (l.trim().startsWith("/")) {
            return `<div class="k9 comment">${l}</div>`;
          }
          return `<div class="k9 line">${kToHtml(firstBranch)}</div>`;
        });

        const res = await execK(
          node.code
            .split("\n")
            .filter((l) => !l.trim().startsWith("/"))
            .join("\n") + "\n"
        );
        console.log(res);
        const resHtml = res.result
          ? `<div class="k9 res">> ${res.result}</div>`
          : "";
        return `<div class="k9 main">${k9.join("")}</div>` + resHtml;
      }
      return `<pre class="syntax-${node.syntax}">${node.code}</pre>`;
    default:
      return JSON.stringify(node, null, 2);
  }
}

async function blockToHtml(nodes) {
  const htmlNodes = await Promise.all(nodes.map((node) => nodeToHtml(node)));
  return htmlNodes.join("\n");
}

let htmlSlides;
let now;

function transform(pres) {
  now = Date.now();

  const nodes = md(pres);
  const astSlides = [[]];
  for (const n of nodes) {
    if (n.type === "border" && n.text.startsWith("---")) {
      astSlides.push([]);
    } else {
      astSlides[astSlides.length - 1].push(n);
    }
  }
  return Promise.all(
    astSlides.map(
      async (slide, i) => `
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/styles.css" media="screen"/>
    <title>En Smak Av APL</title>
  </head>
  <body>
  <main>
  ${await blockToHtml(slide)}
  </main>
  </body>
  <script>
    // slide nav
    document.addEventListener('keydown', function(event) {
      const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
      let nextSlide = ${i};
      if (key === 'ArrowRight' || key === 'ArrowUp') {
        nextSlide += 1
      } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
        nextSlide -= 1
      }
      if (nextSlide !== ${i} && nextSlide >= 0 && nextSlide < ${
        astSlides.length
      }) {
        const url = '/' + nextSlide;
        window.location.replace(url);
      }
    });
    
    // hot reload - YEAH!
    const buildTime =  ${now}
    setInterval(async () => {
      try {
        const res = await fetch('/build')
        const { now } = await res.json();
        if (now && buildTime < now) {
          window.location.reload();
        } 
      } catch (e) {
        //
      }
    }, 500);
  </script>
</html>
  `
    )
  );
}

const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/build", (req, res) => {
  res.send({ now });
});

app.post("/k", (req, res) => {});

app.get("/", (req, res) => {
  res.redirect("/0");
});

app.get("/:slide", async (req, res) => {
  const slide = req.params.slide || 0;
  while (!htmlSlides) {
    console.log("Computing...");
    await new Promise((resolve) => setTimeout(() => resolve(), 100));
  }
  const html = htmlSlides[slide];
  res.header("Content-Type", "text/html").send(html);
});

fs.readFile("./pres.md").then(async (buf) => {
  htmlSlides = await transform(buf.toString());
});

app.listen(3000, () => console.log("...."));
