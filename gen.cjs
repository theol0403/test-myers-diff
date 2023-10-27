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

class LazyLineLengths {
  private lines: string[];
  private cache: number[] = [];
  private cacheLength = 0;
  private generator: Generator<number>;

  constructor(text: string) {
    this.lines = text.split("\\n");
    this.cache = new Array(this.lines.length);
    this.generator = this.accumulateLengths();
  }

  private *accumulateLengths(): Generator<number> {
    let cumulativeLength = 0;
    for (let i = 0; i < this.lines.length; i++) {
      cumulativeLength += this.lines[i].length + 1;
      this.cache[i] = cumulativeLength;
      this.cacheLength++;
      yield cumulativeLength;
    }
  }

  getLengthAt(line: number): number {
    while (this.cacheLength <= line) {
      this.generator.next();
    }
    return this.cache[line];
  }

  // given an array of cumulative line lengths, find the line number given a character position after a known start line.
  // return the line as well as the number of characters until the start of the line.
  findLine(pos: number, startLine: number): [number, number] {
    let low = startLine,
      high = this.lines.length - 1;
    while (low < high) {
      const mid = low + Math.floor((high - low) / 8); // can adjust pivot point based on probability of diffs being close together
      if (this.getLengthAt(mid) <= pos) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    const char = low > 0 ? this.getLengthAt(low - 1) : 0;
    return [low, char];
  }
}

// fast-myers-diff accepts a raw 1D string, and outputs a list of operations to apply to the buffer.
// However, we must compute the line and character positions of the operations ourselves.
// Assuming the operations are sequential, we can use a binary search to find the line number given a character position,
// with the search space being the cumulative line lengths, bounded on the left by the last line.
// Then, given a character position, we can start counting from the cursor to find the line number, and the remainder is the character position on the line.
function* calcDiffWithPosition(
  oldText: string,
  newText: string
): Generator<DocumentChange> {
  const patch = calcPatch(oldText, newText);
  // generate prefix sum of line lengths (accumulate the length)
  const lineLengths = new LazyLineLengths(oldText);
  let lastLine = 0;
  for (const [start, end, text] of patch) {
    const [lineStart, charToLineStart] = lineLengths.findLine(start, lastLine);
    const [lineEnd, charToLineEnd] = lineLengths.findLine(end, lineStart);
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

  let start = Date.now();
  before(function(){
    start = Date.now();
  });

  ${items.join("\n")}

  after(function(){
    console.log('Tests completed in ' + (Date.now() - start) + 'ms');
  });

});
  `;

  writeFileSync("./src/test/suite/main.test.ts", code);
}

main();
