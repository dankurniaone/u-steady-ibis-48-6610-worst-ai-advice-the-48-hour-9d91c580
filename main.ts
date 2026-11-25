// Worst AI Advice — u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580
//
// One line of the worst advice an AI could give. The joke only works if it
// sounds like something a confident assistant would actually say, so the
// line is written in that tidy, helpful voice — and the advice itself is
// exactly the kind of thing you would regret following:
//
//   delete the tests, and the bug stops existing.
//
// The program's whole job is to put that line, untouched, into
// /output/entry.txt (or ./output/entry.txt when /output cannot be created)
// and prove it got there intact. The gate is the competition's own:
// UTF-8 text, 1 to 140 characters, not only white space, one single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry itself. 80 characters — well inside the 140-character cap.
// This string is the entry; do not reword it, the joke lives in the wording.
const ADVICE =
  "If your code has a bug, delete the tests. A bug that isn't tested doesn't exist.";

// The competition's gate, as numbers.
const MIN_CHARS = 1;
const MAX_CHARS = 140;
const OUTPUT_FILE = "entry.txt";

// Count characters the way a reader sees them, not UTF-16 code units,
// so an emoji or an accented letter counts as one character.
function countChars(text: string): number {
  return [...text].length;
}

// Check the line against the gate. Returns every problem found, so a
// failure can say exactly what is wrong instead of just "no".
function gateProblems(line: string): string[] {
  const problems: string[] = [];
  const chars = countChars(line);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    problems.push(
      `line is ${chars} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("line must be a single line, no newlines");
  }
  if (line.trim().length === 0) {
    problems.push("line is only white space");
  }
  return problems;
}

// Pick where entry.txt goes: the shared /output directory first, and the
// directory next to this script when /output cannot be created.
function resolveOutputDir(): string {
  const preferred = "/output";
  try {
    mkdirSync(preferred, { recursive: true });
    return preferred;
  } catch {
    const fallback = join(dirname(fileURLToPath(import.meta.url)), "output");
    mkdirSync(fallback, { recursive: true });
    return fallback;
  }
}

// Write the line plus a trailing newline, then read it back and check the
// round trip: the file on disk must be the line, byte for byte, and still
// pass the gate.
function writeAndVerify(dir: string, line: string): { path: string; chars: number } {
  const path = join(dir, OUTPUT_FILE);
  writeFileSync(path, line + "\n", "utf8");
  // Read it back and strip the newline we added, however many trailing
  // line breaks the platform may have appended — trimEnd covers them all,
  // where stripping a single "\n" would leave a stray "\r" behind.
  const back = readFileSync(path, "utf8").trimEnd();
  if (back !== line) {
    throw new Error("verification failed: file on disk differs from the line");
  }
  const problems = gateProblems(back);
  if (problems.length > 0) {
    throw new Error(`verification failed: ${problems.join("; ")}`);
  }
  return { path, chars: countChars(back) };
}

function main(): number {
  const problems = gateProblems(ADVICE);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`gate failed: ${problem}`);
    }
    return 1;
  }

  try {
    const { path, chars } = writeAndVerify(resolveOutputDir(), ADVICE);
    console.log(`wrote ${path}: ${chars} characters, gate OK`);
    return 0;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

process.exit(main());
