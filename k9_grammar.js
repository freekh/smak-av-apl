// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["statement"]},
    {"name": "statement", "symbols": ["monadic"]},
    {"name": "statement", "symbols": ["dyadic"]},
    {"name": "statement", "symbols": ["triadic"]},
    {"name": "statement", "symbols": ["def"]},
    {"name": "statement", "symbols": ["stdin"]},
    {"name": "statement", "symbols": ["ref"]},
    {"name": "statement", "symbols": ["num"]},
    {"name": "statement", "symbols": ["intparse"]},
    {"name": "statement", "symbols": ["apply"]},
    {"name": "statement", "symbols": ["fun"]},
    {"name": "statement", "symbols": ["cond"]},
    {"name": "statement", "symbols": ["comment"]},
    {"name": "statement", "symbols": ["par"]},
    {"name": "statement", "symbols": ["op"]},
    {"name": "statement", "symbols": ["array"]},
    {"name": "array$ebnf$1", "symbols": []},
    {"name": "array$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "num"]},
    {"name": "array$ebnf$1", "symbols": ["array$ebnf$1", "array$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array", "symbols": ["num", "array$ebnf$1"]},
    {"name": "ref$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "ref$ebnf$1", "symbols": ["ref$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ref", "symbols": ["ref$ebnf$1"], "postprocess": 
        function(data) {
            return {
                type: "ref",
                data
            };
        }
        },
    {"name": "def", "symbols": ["ref", {"literal":":"}, "statement"], "postprocess": 
        function(data) {
            return {
                type: "def",
                data
            };
        }
        },
    {"name": "num$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "num$ebnf$1", "symbols": ["num$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "num", "symbols": ["num$ebnf$1"], "postprocess": 
        function(data) {
            return {
                type: "num",
                data
            };
        }
        },
    {"name": "intparse$string$1", "symbols": [{"literal":"`"}, {"literal":"i"}, {"literal":"$"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "intparse", "symbols": ["intparse$string$1"], "postprocess": 
        function(data) {
            return {
                type: "intparse",
                data
            };
        }
        },
    {"name": "string$ebnf$1", "symbols": [/[_0-9a-zA-Z\-\.]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[_0-9a-zA-Z\-\.]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": [{"literal":"\""}, "string$ebnf$1", {"literal":"\""}], "postprocess": 
        function(data) {
            return {
                type: "string",
                data
            };
        }
        },
    {"name": "stdin$string$1", "symbols": [{"literal":"0"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stdin", "symbols": ["stdin$string$1", "string"], "postprocess": 
        function(data) {
            return {
                type: "stdin",
                data
            };
        }
        },
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"#"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"$"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"~"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"&"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"\\"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"!"}]},
    {"name": "monadic$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "monadic", "symbols": ["monadic$subexpression$1", "statement"], "postprocess": 
        function(data) {
            return {
                type: "monadic",
                data
            };
        }
        },
    {"name": "par", "symbols": [{"literal":"("}, "statement", {"literal":")"}], "postprocess": 
        function(data) {
            return {
                type: "par",
                data
            };
        }
        },
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"'"}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"#"}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"&"}]},
    {"name": "dyadic$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "dyadic", "symbols": ["statement", "dyadic$subexpression$1", "statement"], "postprocess": 
        function(data) {
            return {
                type: "dyadic",
                data
            };
        }
        },
    {"name": "triadic$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "triadic", "symbols": ["statement", {"literal":" "}, "statement", "triadic$subexpression$1", "statement"], "postprocess": 
        function(data) {
            return {
                type: "dyadic",
                data
            };
        }
        },
    {"name": "args$ebnf$1", "symbols": []},
    {"name": "args$ebnf$1$subexpression$1", "symbols": [{"literal":";"}, "ref"]},
    {"name": "args$ebnf$1", "symbols": ["args$ebnf$1", "args$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "args", "symbols": ["ref", "args$ebnf$1"], "postprocess": 
        function(data) {
            return {
                type: "args",
                data
            };
        }
        },
    {"name": "fun$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"]"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fun$ebnf$1$subexpression$1", "symbols": [{"literal":"["}, "args", "fun$ebnf$1$subexpression$1$string$1"]},
    {"name": "fun$ebnf$1", "symbols": ["fun$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun", "symbols": [{"literal":"{"}, "fun$ebnf$1", "statement", {"literal":"}"}], "postprocess": 
        function(data) {
            return {
                type: "fun",
                data
            };
        }
        },
    {"name": "op$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "op$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "op$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "op$subexpression$1", "symbols": [{"literal":"~"}]},
    {"name": "op", "symbols": ["op$subexpression$1"]},
    {"name": "apply$ebnf$1$subexpression$1", "symbols": [{"literal":"["}, "statement", {"literal":"]"}]},
    {"name": "apply$ebnf$1$subexpression$1", "symbols": ["statement"]},
    {"name": "apply$ebnf$1", "symbols": ["apply$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "apply$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "apply", "symbols": ["ref", "fun", "apply$ebnf$1"], "postprocess": 
        function(data) {
            return {
                type: "apply",
                data
            };
        }
        },
    {"name": "cond", "symbols": [{"literal":"["}, "statement", {"literal":";"}, "statement", {"literal":";"}, "statement", {"literal":"]"}], "postprocess": 
        function(data) {
            return {
                type: "cond",
                data
            };
        }
        },
    {"name": "comment$string$1", "symbols": [{"literal":" "}, {"literal":"/"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment$ebnf$1", "symbols": [/[a-zA-Z0-9\(\) \:\-]/]},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[a-zA-Z0-9\(\) \:\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment", "symbols": ["statement", "comment$string$1", "comment$ebnf$1"], "postprocess": 
        function(data) {
            return {
                type: "comment",
                data
            };
        }
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
