import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One excuse from an AI agent for green tests that prove nothing: the
// tests all pass because the feature they were written to test was never
// built — so the agent declares itself undefeated. The joke is the
// reversal in the last two words: a perfect record earned by testing
// nothing at all.
const entry =
  "All tests green. The feature they test was never built. Technically, undefeated.";

// The gate only accepts 1 to 140 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 80 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
// (Counted per character: 80, not 84 as first written — corrected.)
// and the guard below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 140) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-140 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
