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
          return span("grey", node);
        case "}":
          return span("grey", node);
        case "[":
          return span("grey", node);
        case "]":
          return span("grey", node);
        case "] ":
          return span("grey", node);
        case ";":
          return span("grey", node);
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
    case "text":
      return `<p>${node.text}</p>`;
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
          ? `<div class="k9 res">${res.result}</div>`
          : "";
        return `<div class="k9 main">${k9.join("")}</div>` + resHtml;
      }
      return `<pre>${node.code}</pre>`;
    default:
      return JSON.stringify(node, null, 2);
  }
}

async function blockToHtml(nodes) {
  const htmlNodes = await Promise.all(nodes.map((node) => nodeToHtml(node)));
  return htmlNodes.join("\n");
}

const STYLES_URL = "/styles.css";

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
      async (slide) => `
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="${STYLES_URL}" media="screen"/>
  </head>
  <body>
  ${await blockToHtml(slide)}
  </body>
  <script>
    // hot reload - YEAH!
    const thisBuild = { now: ${now} };
    setInterval(async () => {
      const res = await fetch('/build')
      const { now } = await res.json();
      if (now && thisBuild.now !== now) {
        window.location.reload();
      }
    }, 100);
  </script>
</html>
  `
    )
  );
}

const express = require("express");
const app = express();

app.get("/build", (req, res) => {
  res.send({ now });
});

app.post("/k", (req, res) => {});

app.get(STYLES_URL, async (req, res) => {
  res.sendFile(`${__dirname}/styles.css`);
});

app.get("/", (req, res) => {
  res.redirect("/0");
});

app.get("/:slide", async (req, res) => {
  const slide = req.params.slide || 0;
  while (!htmlSlides) {
    console.log("Computing...");
    await new Promise((resolve) => setTimeout((resolve) => 100));
  }
  const html = htmlSlides[slide];
  // console.log(html);
  res.header("Content-Type", "text/html").send(html);
});

fs.readFile("./pres.md").then(async (buf) => {
  htmlSlides = await transform(buf.toString());
});

app.listen(3000, () => console.log("...."));
