// Worst AI Advice — u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580
// One line of the worst advice an AI could give, 140 characters max.
// Writes it to /output/entry.txt (falls back to ./output/ when /output
// is not writable) and checks the gate first: UTF-8 text, 1 to 140
// characters, not only white space, a single line.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "If your code has a bug, delete the tests. A bug that isn't tested doesn't exist.";

function main(): number {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 140) {
    console.error(`gate failed: line is ${chars} characters, must be 1-140`);
    return 1;
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    console.error("gate failed: line must be a single line, no newlines");
    return 1;
  }
  if (LINE.trim().length === 0) {
    console.error("gate failed: line is only white space");
    return 1;
  }

  const here = dirname(fileURLToPath(import.meta.url));
  let outDir = "/output";
  try {
    mkdirSync(outDir, { recursive: true });
  } catch {
    outDir = join(here, "output");
    mkdirSync(outDir, { recursive: true });
  }
  const path = join(outDir, "entry.txt");
  writeFileSync(path, LINE + "\n", "utf8");

  // Verify the round trip: read it back and check the gate again.
  const back = readFileSync(path, "utf8");
  const backChars = [...back.trimEnd()].length;
  if (back.trimEnd() !== LINE || backChars < 1 || backChars > 140) {
    console.error("verification failed: written file does not match the line");
    return 1;
  }
  console.log(`wrote ${path}: ${backChars} characters, gate OK`);
  return 0;
}

process.exit(main());
