// Driver for the markdown-render-speed entry: renders every case in
// /input/cases.json with parse() from parse.js and writes the HTML array to
// /output/html.json. When MAKEFUN_INPUT_DIR / MAKEFUN_OUTPUT_DIR are set they
// stand in for /input and /output (local runs); otherwise the harness mounts
// are used. A local practice path is tried last so the entry can be graded
// on this machine without a container.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const KIT_PRACTICE = '/home/hatch/workspace/make-fun/markdown-render-speed-02/markdown-render-speed-02-kit/practice';

function pickDir(envName: string, fallback: string, practiceSub: string): string {
  const fromEnv = process.env[envName];
  if (fromEnv) return fromEnv;
  if (existsSync(fallback)) return fallback;
  return join(KIT_PRACTICE, practiceSub);
}

const INPUT_DIR = pickDir('MAKEFUN_INPUT_DIR', '/input', 'input');
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? (existsSync('/output') ? '/output' : '/tmp/md-out');

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as { id: string; markdown: string }[];
const html: string[] = new Array(cases.length);
for (let i = 0; i < cases.length; i++) html[i] = parse(cases[i].markdown);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'html.json'), JSON.stringify(html));
