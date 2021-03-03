main -> statement
statement -> monadic | dyadic | triadic | def | stdin | ref | num | intparse | apply | fun | cond | comment | par | op | array
array -> num (" " num):*
ref -> [a-zA-Z]:+ {%
    function(data) {
        return {
            type: "ref",
            data
        };
    }
%}
def -> ref ":" statement {%
    function(data) {
        return {
            type: "def",
            data
        };
    }
%}
num -> [0-9]:+ {%
    function(data) {
        return {
            type: "num",
            data
        };
    }
%}
intparse -> "`i$" {%
    function(data) {
        return {
            type: "intparse",
            data
        };
    }
%}
string -> "\"" [_0-9a-zA-Z\-\.]:+ "\"" {%
    function(data) {
        return {
            type: "string",
            data
        };
    }
%}
stdin -> "0:" string {%
    function(data) {
        return {
            type: "stdin",
            data
        };
    }
%}
monadic ->  ("#" | "$" | "~" | "*" | "&" | "\\" | "!" | "_") statement {%
    function(data) {
        return {
            type: "monadic",
            data
        };
    }
%}
par -> "(" statement ")" {%
    function(data) {
        return {
            type: "par",
            data
        };
    }
%}
dyadic -> statement ("'" | "=" | "#" | "+" | "*" | "&" | "_") statement {%
    function(data) {
        return {
            type: "dyadic",
            data
        };
    }
%}
triadic -> statement " " statement ("/") statement {%
    function(data) {
        return {
            type: "dyadic",
            data
        };
    }
%}
args -> ref (";" ref):* {%
    function(data) {
        return {
            type: "args",
            data
        };
    }
%}
fun -> "{" ("[" args "] "):? statement "}" {%
    function(data) {
        return {
            type: "fun",
            data
        };
    }
%}
op -> ("=" | "+" | "-" | "~")
apply -> ref fun ("[" statement "]" | statement):? {%
    function(data) {
        return {
            type: "apply",
            data
        };
    }
%}
cond -> "[" statement ";" statement ";" statement "]" {%
    function(data) {
        return {
            type: "cond",
            data
        };
    }
%}
comment -> statement " / " [a-zA-Z0-9\(\) \:\-]:+ {%
    function(data) {
        return {
            type: "comment",
            data
        };
    }
%}