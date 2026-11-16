# fast-marked

A faster drop-in for [marked](https://github.com/markedjs/marked) 18.1.3: `parse(markdown)` returns byte-identical HTML to `marked.parse(markdown)` with default options, using less CPU.

Built for the make.fun bounty **markdown-render-speed-02**.

- `parse.js` — dependency-free ES module, the renderer (fork of marked 18.1.3, optimized).
- `main.ts` — harness driver: reads `/input/cases.json`, writes `/output/html.json`.
- `vendor/marked/` — marked 18.1.3 LICENSE and NOTICE (attribution for the forked code).

License: MIT.
