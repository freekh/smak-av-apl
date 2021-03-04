# What

Fredriks presentation about K / APL; initially held 2021-03-05.

# How:

NOTE: requires k on PATH; downloadable from here: https://shakti.sh/

### Install:

```
npm install
```

### Running the server:

```
npx nodemon -w k9_grammar.js -w pres.js -w pres.md -w public/styles.css
```

### Grammar:

Updating the grammar and checking the gammar (put oneliners in test.k file):

```
npx nearleyc k9_grammar.ne --out k9_grammar.js; cat test.k | npx nearley-test ./k9_grammar.js
```
