const { readdirSync } = require("fs");
const { writeFileSync } = require("fs-extra");
const path = require("path");

async function main() {
  const files = readdirSync("./fixtures");
  const items = [];
  for (let idx = 0; idx < files.length; idx++) {
    if (idx == 0) continue;
    let file_a = files[idx - 1];
    let file_b = files[idx];
    const name = `${file_a} - ${file_b}`;
    file_a = path.resolve(__dirname, "./fixtures", file_a);
    file_b = path.resolve(__dirname, "./fixtures", file_b);
    const item = `
    it(${JSON.stringify(name)}, async () => {
      const file_a = ${JSON.stringify(file_a)}
      const file_b = ${JSON.stringify(file_b)}
      const text_a = (await readFile(file_a)).toString().replace(/\\r\\n/g, '\\n')
      const text_b = (await readFile(file_b)).toString().replace(/\\r\\n/g, '\\n')
      await assertTextChange(text_a, text_b)
    })
    `;
    items.push(item);
  }

  const code = `
import { strict as assert } from 'assert';

import { calcPatch } from 'fast-myers-diff';
import { readdir, readFile } from 'fs-extra';
import {
  Position,
  Range,
  TextEditor,
  ViewColumn,
  commands,
  window,
  workspace,
} from 'vscode';

interface DocumentChange {
  range: Range
  text: string
  rangeLength: number
}

// given an array of cumulative line lengths, find the line number given a character position after a known start line.
// return the line as well as the number of characters until the start of the line.
function findLine(
  lineLengths: number[],
  pos: number,
  startLine: number
): [number, number] {
  let low = startLine,
    high = lineLengths.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (lineLengths[mid] <= pos) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  const line = low; // adjust because of the extra count at the beginning
  const char = line > 0 ? lineLengths[line - 1] : 0;
  return [line, char];
}

// fast-myers-diff accepts a raw 1D string, and outputs a list of operations to apply to the buffer.
// However, we must compute the line and character positions of the operations ourselves.
// Assuming the operations are sequential, we can keep a "cursor" which keeps a running total of the number of characters before a given line.
// Then, given a character position, we can start counting from the cursor to find the line number, and the remainder is the character position on the line.
function* calcDiffWithPosition(
  oldText: string,
  newText: string
): Generator<DocumentChange> {
  const patch = calcPatch(oldText, newText);
  // generate prefix sum of line lengths (accumulate the length)
  const lineLengths = oldText.split("\\n").map((line) => line.length + 1);
  for (let i = 1; i < lineLengths.length; i++) {
    lineLengths[i] += lineLengths[i - 1];
  }
  let lastLine = 0;
  for (const [start, end, text] of patch) {
    const [lineStart, charToLineStart] = findLine(lineLengths, start, lastLine);
    const [lineEnd, charToLineEnd] = findLine(lineLengths, end, lineStart);
    const charStart = start - charToLineStart;
    const charEnd = end - charToLineEnd;
    const range = new Range(
      new Position(lineStart, charStart),
      new Position(lineEnd, charEnd)
    );
    lastLine = lineEnd;
    yield {
      range,
      text,
      rangeLength: end - start,
    };
  }
}


async function setupEditorWithText(text: string): Promise<TextEditor> {
  const doc = await workspace.openTextDocument({ content: text });
  return window.showTextDocument(doc, ViewColumn.One);
}

async function assertTextChange(oldText: string, newText: string): Promise<void> {
  const editor = await setupEditorWithText(oldText);
  const ok = await editor.edit(builder => {
    const changes = calcDiffWithPosition(oldText, newText);
    for (const { range, text } of changes) {
      builder.replace(range, text);
    }
  });
  assert.ok(ok);
  assert.deepEqual(editor.document.getText().replace(/\\r\\n/g, '\\n'), newText);
}

describe('Test', async () => {
  afterEach(async () => {
    await commands.executeCommand('workbench.action.closeAllEditors');
  });

  const startTime = Date.now();

  ${items.join("\n")}

  console.log('Tests completed in ' + (Date.now() - startTime) + 'ms');

});
  `;

  writeFileSync("./src/test/suite/main.test.ts", code);
}

main();
