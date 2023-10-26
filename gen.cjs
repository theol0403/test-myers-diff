const { readdirSync } = require('fs')
const { writeFileSync } = require('fs-extra')
const path = require('path')

async function main() {
  const files = readdirSync('./fixtures')
  const items = []
  for (let idx = 0; idx < files.length; idx++) {
    if (idx == 0) continue
    let file_a = files[idx - 1]
    let file_b = files[idx]
    const name = `${file_a} - ${file_b}`
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
    `
    items.push(item)
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

function* calcDiffWithPosition(
  oldText: string,
  newText: string
): Generator<DocumentChange> {
  const eol = '\\n';
  const splitText = oldText.split(eol);
  const patch = calcPatch(oldText, newText);
  for (const [start, end, text] of patch) {
    const lineStart = oldText.slice(0, start).split(eol).length - 1;
    const lineEnd = oldText.slice(0, end).split(eol).length - 1;
    const charStart =
      start -
      (lineStart > 0 ? splitText.slice(0, lineStart).join(eol).length + eol.length : 0);
    const charEnd =
      end - (lineEnd > 0 ? splitText.slice(0, lineEnd).join(eol).length + eol.length : 0);
    const range = new Range(
      new Position(lineStart, charStart),
      new Position(lineEnd, charEnd)
    );
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

  ${items.join('\n')}

});
  `

  writeFileSync('./src/test/suite/main.test.ts', code)
}

main()
