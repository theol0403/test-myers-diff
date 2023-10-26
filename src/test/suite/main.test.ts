
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
  const eol = '\n';
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
  assert.deepEqual(editor.document.getText().replace(/\r\n/g, '\n'), newText);
}

describe('Test', async () => {
  afterEach(async () => {
    await commands.executeCommand('workbench.action.closeAllEditors');
  });

  
    it("10_eval_e72b54.c - 11_eval_a9a48d.c", async () => {
      const file_a = "../../fixtures/10_eval_e72b54.c"
      const file_b = "../../fixtures/11_eval_a9a48d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("11_eval_a9a48d.c - 12_eval_fd791d.c", async () => {
      const file_a = "../../fixtures/11_eval_a9a48d.c"
      const file_b = "../../fixtures/12_eval_fd791d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("12_eval_fd791d.c - 13_eval_09a17f.c", async () => {
      const file_a = "../../fixtures/12_eval_fd791d.c"
      const file_b = "../../fixtures/13_eval_09a17f.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("13_eval_09a17f.c - 14_eval_dc6d0d.c", async () => {
      const file_a = "../../fixtures/13_eval_09a17f.c"
      const file_b = "../../fixtures/14_eval_dc6d0d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("14_eval_dc6d0d.c - 15_eval_cf8b2c.c", async () => {
      const file_a = "../../fixtures/14_eval_dc6d0d.c"
      const file_b = "../../fixtures/15_eval_cf8b2c.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("15_eval_cf8b2c.c - 16_eval_bc13bc.c", async () => {
      const file_a = "../../fixtures/15_eval_cf8b2c.c"
      const file_b = "../../fixtures/16_eval_bc13bc.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("16_eval_bc13bc.c - 17_eval_8e11c1.c", async () => {
      const file_a = "../../fixtures/16_eval_bc13bc.c"
      const file_b = "../../fixtures/17_eval_8e11c1.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("17_eval_8e11c1.c - 18_eval_448d48.c", async () => {
      const file_a = "../../fixtures/17_eval_8e11c1.c"
      const file_b = "../../fixtures/18_eval_448d48.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("18_eval_448d48.c - 19_eval_b85f1d.c", async () => {
      const file_a = "../../fixtures/18_eval_448d48.c"
      const file_b = "../../fixtures/19_eval_b85f1d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("19_eval_b85f1d.c - 1_eval_af010e.c", async () => {
      const file_a = "../../fixtures/19_eval_b85f1d.c"
      const file_b = "../../fixtures/1_eval_af010e.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("1_eval_af010e.c - 20_eval_211edc.c", async () => {
      const file_a = "../../fixtures/1_eval_af010e.c"
      const file_b = "../../fixtures/20_eval_211edc.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("20_eval_211edc.c - 21_eval_71530c.c", async () => {
      const file_a = "../../fixtures/20_eval_211edc.c"
      const file_b = "../../fixtures/21_eval_71530c.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("21_eval_71530c.c - 22_eval_a1f0f0.c", async () => {
      const file_a = "../../fixtures/21_eval_71530c.c"
      const file_b = "../../fixtures/22_eval_a1f0f0.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("22_eval_a1f0f0.c - 23_eval_ac0fda.c", async () => {
      const file_a = "../../fixtures/22_eval_a1f0f0.c"
      const file_b = "../../fixtures/23_eval_ac0fda.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("23_eval_ac0fda.c - 24_eval_597015.c", async () => {
      const file_a = "../../fixtures/23_eval_ac0fda.c"
      const file_b = "../../fixtures/24_eval_597015.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("24_eval_597015.c - 25_eval_cefd77.c", async () => {
      const file_a = "../../fixtures/24_eval_597015.c"
      const file_b = "../../fixtures/25_eval_cefd77.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("25_eval_cefd77.c - 26_eval_64ccfd.c", async () => {
      const file_a = "../../fixtures/25_eval_cefd77.c"
      const file_b = "../../fixtures/26_eval_64ccfd.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("26_eval_64ccfd.c - 27_eval_bb29ef.c", async () => {
      const file_a = "../../fixtures/26_eval_64ccfd.c"
      const file_b = "../../fixtures/27_eval_bb29ef.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("27_eval_bb29ef.c - 28_eval_8ac9ab.c", async () => {
      const file_a = "../../fixtures/27_eval_bb29ef.c"
      const file_b = "../../fixtures/28_eval_8ac9ab.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("28_eval_8ac9ab.c - 29_eval_b19367.c", async () => {
      const file_a = "../../fixtures/28_eval_8ac9ab.c"
      const file_b = "../../fixtures/29_eval_b19367.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("29_eval_b19367.c - 2_eval_5df4fd.c", async () => {
      const file_a = "../../fixtures/29_eval_b19367.c"
      const file_b = "../../fixtures/2_eval_5df4fd.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("2_eval_5df4fd.c - 30_eval_c5576f.c", async () => {
      const file_a = "../../fixtures/2_eval_5df4fd.c"
      const file_b = "../../fixtures/30_eval_c5576f.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("30_eval_c5576f.c - 31_eval_db6428.c", async () => {
      const file_a = "../../fixtures/30_eval_c5576f.c"
      const file_b = "../../fixtures/31_eval_db6428.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("31_eval_db6428.c - 32_eval_faef57.c", async () => {
      const file_a = "../../fixtures/31_eval_db6428.c"
      const file_b = "../../fixtures/32_eval_faef57.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("32_eval_faef57.c - 33_eval_d9e7da.c", async () => {
      const file_a = "../../fixtures/32_eval_faef57.c"
      const file_b = "../../fixtures/33_eval_d9e7da.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("33_eval_d9e7da.c - 34_eval_90ad3c.c", async () => {
      const file_a = "../../fixtures/33_eval_d9e7da.c"
      const file_b = "../../fixtures/34_eval_90ad3c.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("34_eval_90ad3c.c - 35_eval_bc0c7d.c", async () => {
      const file_a = "../../fixtures/34_eval_90ad3c.c"
      const file_b = "../../fixtures/35_eval_bc0c7d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("35_eval_bc0c7d.c - 36_eval_8cbb24.c", async () => {
      const file_a = "../../fixtures/35_eval_bc0c7d.c"
      const file_b = "../../fixtures/36_eval_8cbb24.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("36_eval_8cbb24.c - 37_eval_2f17ef.c", async () => {
      const file_a = "../../fixtures/36_eval_8cbb24.c"
      const file_b = "../../fixtures/37_eval_2f17ef.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("37_eval_2f17ef.c - 38_eval_aa92a0.c", async () => {
      const file_a = "../../fixtures/37_eval_2f17ef.c"
      const file_b = "../../fixtures/38_eval_aa92a0.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("38_eval_aa92a0.c - 39_eval_d83a19.c", async () => {
      const file_a = "../../fixtures/38_eval_aa92a0.c"
      const file_b = "../../fixtures/39_eval_d83a19.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("39_eval_d83a19.c - 3_eval_e5a424.c", async () => {
      const file_a = "../../fixtures/39_eval_d83a19.c"
      const file_b = "../../fixtures/3_eval_e5a424.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("3_eval_e5a424.c - 40_eval_a0cb53.c", async () => {
      const file_a = "../../fixtures/3_eval_e5a424.c"
      const file_b = "../../fixtures/40_eval_a0cb53.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("40_eval_a0cb53.c - 41_eval_971049.c", async () => {
      const file_a = "../../fixtures/40_eval_a0cb53.c"
      const file_b = "../../fixtures/41_eval_971049.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("41_eval_971049.c - 42_eval_b3d513.c", async () => {
      const file_a = "../../fixtures/41_eval_971049.c"
      const file_b = "../../fixtures/42_eval_b3d513.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("42_eval_b3d513.c - 43_eval_9f3c4c.c", async () => {
      const file_a = "../../fixtures/42_eval_b3d513.c"
      const file_b = "../../fixtures/43_eval_9f3c4c.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("43_eval_9f3c4c.c - 44_eval_cfd4fd.c", async () => {
      const file_a = "../../fixtures/43_eval_9f3c4c.c"
      const file_b = "../../fixtures/44_eval_cfd4fd.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("44_eval_cfd4fd.c - 45_eval_e2fdd5.c", async () => {
      const file_a = "../../fixtures/44_eval_cfd4fd.c"
      const file_b = "../../fixtures/45_eval_e2fdd5.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("45_eval_e2fdd5.c - 46_eval_84378c.c", async () => {
      const file_a = "../../fixtures/45_eval_e2fdd5.c"
      const file_b = "../../fixtures/46_eval_84378c.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("46_eval_84378c.c - 47_eval_ca344b.c", async () => {
      const file_a = "../../fixtures/46_eval_84378c.c"
      const file_b = "../../fixtures/47_eval_ca344b.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("47_eval_ca344b.c - 48_eval_e86611.c", async () => {
      const file_a = "../../fixtures/47_eval_ca344b.c"
      const file_b = "../../fixtures/48_eval_e86611.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("48_eval_e86611.c - 49_eval_6b912d.c", async () => {
      const file_a = "../../fixtures/48_eval_e86611.c"
      const file_b = "../../fixtures/49_eval_6b912d.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("49_eval_6b912d.c - 4_eval_ebe489.c", async () => {
      const file_a = "../../fixtures/49_eval_6b912d.c"
      const file_b = "../../fixtures/4_eval_ebe489.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("4_eval_ebe489.c - 50_eval_ad7f9a.c", async () => {
      const file_a = "../../fixtures/4_eval_ebe489.c"
      const file_b = "../../fixtures/50_eval_ad7f9a.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("50_eval_ad7f9a.c - 5_eval_3cbb02.c", async () => {
      const file_a = "../../fixtures/50_eval_ad7f9a.c"
      const file_b = "../../fixtures/5_eval_3cbb02.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("5_eval_3cbb02.c - 6_eval_9ff6f7.c", async () => {
      const file_a = "../../fixtures/5_eval_3cbb02.c"
      const file_b = "../../fixtures/6_eval_9ff6f7.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("6_eval_9ff6f7.c - 7_eval_6c0f90.c", async () => {
      const file_a = "../../fixtures/6_eval_9ff6f7.c"
      const file_b = "../../fixtures/7_eval_6c0f90.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("7_eval_6c0f90.c - 8_eval_8e9324.c", async () => {
      const file_a = "../../fixtures/7_eval_6c0f90.c"
      const file_b = "../../fixtures/8_eval_8e9324.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("8_eval_8e9324.c - 9_eval_1ac588.c", async () => {
      const file_a = "../../fixtures/8_eval_8e9324.c"
      const file_b = "../../fixtures/9_eval_1ac588.c"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("9_eval_1ac588.c - add_delete_from.json", async () => {
      const file_a = "../../fixtures/9_eval_1ac588.c"
      const file_b = "../../fixtures/add_delete_from.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("add_delete_from.json - add_delete_to.json", async () => {
      const file_a = "../../fixtures/add_delete_from.json"
      const file_b = "../../fixtures/add_delete_to.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("add_delete_to.json - array.json", async () => {
      const file_a = "../../fixtures/add_delete_to.json"
      const file_b = "../../fixtures/array.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("array.json - array_changed.json", async () => {
      const file_a = "../../fixtures/array.json"
      const file_b = "../../fixtures/array_changed.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("array_changed.json - base.json", async () => {
      const file_a = "../../fixtures/array_changed.json"
      const file_b = "../../fixtures/base.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("base.json - base_changed.json", async () => {
      const file_a = "../../fixtures/base.json"
      const file_b = "../../fixtures/base_changed.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("base_changed.json - changed_types_from.json", async () => {
      const file_a = "../../fixtures/base_changed.json"
      const file_b = "../../fixtures/changed_types_from.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("changed_types_from.json - changed_types_to.json", async () => {
      const file_a = "../../fixtures/changed_types_from.json"
      const file_b = "../../fixtures/changed_types_to.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("changed_types_to.json - gitdiff-only-newlines.txt", async () => {
      const file_a = "../../fixtures/changed_types_to.json"
      const file_b = "../../fixtures/gitdiff-only-newlines.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gitdiff-only-newlines.txt - gold-12-subcolors.txt", async () => {
      const file_a = "../../fixtures/gitdiff-only-newlines.txt"
      const file_b = "../../fixtures/gold-12-subcolors.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-12-subcolors.txt - gold-12-t.txt", async () => {
      const file_a = "../../fixtures/gold-12-subcolors.txt"
      const file_b = "../../fixtures/gold-12-t.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-12-t.txt - gold-12.txt", async () => {
      const file_a = "../../fixtures/gold-12-t.txt"
      const file_b = "../../fixtures/gold-12.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-12.txt - gold-3.txt", async () => {
      const file_a = "../../fixtures/gold-12.txt"
      const file_b = "../../fixtures/gold-3.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-3.txt - gold-45-95.txt", async () => {
      const file_a = "../../fixtures/gold-3.txt"
      const file_b = "../../fixtures/gold-45-95.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-95.txt - gold-45-h-nb.txt", async () => {
      const file_a = "../../fixtures/gold-45-95.txt"
      const file_b = "../../fixtures/gold-45-h-nb.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-h-nb.txt - gold-45-h.txt", async () => {
      const file_a = "../../fixtures/gold-45-h-nb.txt"
      const file_b = "../../fixtures/gold-45-h.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-h.txt - gold-45-h3.txt", async () => {
      const file_a = "../../fixtures/gold-45-h.txt"
      const file_b = "../../fixtures/gold-45-h3.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-h3.txt - gold-45-l.txt", async () => {
      const file_a = "../../fixtures/gold-45-h3.txt"
      const file_b = "../../fixtures/gold-45-l.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-l.txt - gold-45-lbrb.txt", async () => {
      const file_a = "../../fixtures/gold-45-l.txt"
      const file_b = "../../fixtures/gold-45-lbrb.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-lbrb.txt - gold-45-ln-color.txt", async () => {
      const file_a = "../../fixtures/gold-45-lbrb.txt"
      const file_b = "../../fixtures/gold-45-ln-color.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-ln-color.txt - gold-45-ln.txt", async () => {
      const file_a = "../../fixtures/gold-45-ln-color.txt"
      const file_b = "../../fixtures/gold-45-ln.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-ln.txt - gold-45-lr.txt", async () => {
      const file_a = "../../fixtures/gold-45-ln.txt"
      const file_b = "../../fixtures/gold-45-lr.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-lr.txt - gold-45-nb.txt", async () => {
      const file_a = "../../fixtures/gold-45-lr.txt"
      const file_b = "../../fixtures/gold-45-nb.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-nb.txt - gold-45-nh.txt", async () => {
      const file_a = "../../fixtures/gold-45-nb.txt"
      const file_b = "../../fixtures/gold-45-nh.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-nh.txt - gold-45-pipe.txt", async () => {
      const file_a = "../../fixtures/gold-45-nh.txt"
      const file_b = "../../fixtures/gold-45-pipe.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-pipe.txt - gold-45-sas-h-nb.txt", async () => {
      const file_a = "../../fixtures/gold-45-pipe.txt"
      const file_b = "../../fixtures/gold-45-sas-h-nb.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-sas-h-nb.txt - gold-45-sas-h.txt", async () => {
      const file_a = "../../fixtures/gold-45-sas-h-nb.txt"
      const file_b = "../../fixtures/gold-45-sas-h.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-sas-h.txt - gold-45-sas.txt", async () => {
      const file_a = "../../fixtures/gold-45-sas-h.txt"
      const file_b = "../../fixtures/gold-45-sas.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45-sas.txt - gold-45.txt", async () => {
      const file_a = "../../fixtures/gold-45-sas.txt"
      const file_b = "../../fixtures/gold-45.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-45.txt - gold-4dn.txt", async () => {
      const file_a = "../../fixtures/gold-45.txt"
      const file_b = "../../fixtures/gold-4dn.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-4dn.txt - gold-67-ln.txt", async () => {
      const file_a = "../../fixtures/gold-4dn.txt"
      const file_b = "../../fixtures/gold-67-ln.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-67-ln.txt - gold-67-u3.txt", async () => {
      const file_a = "../../fixtures/gold-67-ln.txt"
      const file_b = "../../fixtures/gold-67-u3.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-67-u3.txt - gold-67-wf.txt", async () => {
      const file_a = "../../fixtures/gold-67-u3.txt"
      const file_b = "../../fixtures/gold-67-wf.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-67-wf.txt - gold-67.txt", async () => {
      const file_a = "../../fixtures/gold-67-wf.txt"
      const file_b = "../../fixtures/gold-67.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-67.txt - gold-bad-encoding.txt", async () => {
      const file_a = "../../fixtures/gold-67.txt"
      const file_b = "../../fixtures/gold-bad-encoding.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-bad-encoding.txt - gold-dir.txt", async () => {
      const file_a = "../../fixtures/gold-bad-encoding.txt"
      const file_b = "../../fixtures/gold-dir.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-dir.txt - gold-dn5.txt", async () => {
      const file_a = "../../fixtures/gold-dir.txt"
      const file_b = "../../fixtures/gold-dn5.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-dn5.txt - gold-exclude.txt", async () => {
      const file_a = "../../fixtures/gold-dn5.txt"
      const file_b = "../../fixtures/gold-exclude.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-exclude.txt - gold-exit-process-sub", async () => {
      const file_a = "../../fixtures/gold-exclude.txt"
      const file_b = "../../fixtures/gold-exit-process-sub"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-exit-process-sub - gold-file-not-found.txt", async () => {
      const file_a = "../../fixtures/gold-exit-process-sub"
      const file_b = "../../fixtures/gold-file-not-found.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-file-not-found.txt - gold-hide-cr-if-dos", async () => {
      const file_a = "../../fixtures/gold-file-not-found.txt"
      const file_b = "../../fixtures/gold-hide-cr-if-dos"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-hide-cr-if-dos - gold-identical-on.txt", async () => {
      const file_a = "../../fixtures/gold-hide-cr-if-dos"
      const file_b = "../../fixtures/gold-identical-on.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-identical-on.txt - gold-no-cr-indent", async () => {
      const file_a = "../../fixtures/gold-identical-on.txt"
      const file_b = "../../fixtures/gold-no-cr-indent"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-no-cr-indent - gold-permissions-diff-binary.txt", async () => {
      const file_a = "../../fixtures/gold-no-cr-indent"
      const file_b = "../../fixtures/gold-permissions-diff-binary.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-permissions-diff-binary.txt - gold-permissions-diff-text.txt", async () => {
      const file_a = "../../fixtures/gold-permissions-diff-binary.txt"
      const file_b = "../../fixtures/gold-permissions-diff-text.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-permissions-diff-text.txt - gold-permissions-diff.txt", async () => {
      const file_a = "../../fixtures/gold-permissions-diff-text.txt"
      const file_b = "../../fixtures/gold-permissions-diff.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-permissions-diff.txt - gold-permissions-same.txt", async () => {
      const file_a = "../../fixtures/gold-permissions-diff.txt"
      const file_b = "../../fixtures/gold-permissions-same.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-permissions-same.txt - gold-recursive-with-exclude.txt", async () => {
      const file_a = "../../fixtures/gold-permissions-same.txt"
      const file_b = "../../fixtures/gold-recursive-with-exclude.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-recursive-with-exclude.txt - gold-recursive-with-exclude2.txt", async () => {
      const file_a = "../../fixtures/gold-recursive-with-exclude.txt"
      const file_b = "../../fixtures/gold-recursive-with-exclude2.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-recursive-with-exclude2.txt - gold-recursive.txt", async () => {
      const file_a = "../../fixtures/gold-recursive-with-exclude2.txt"
      const file_b = "../../fixtures/gold-recursive.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-recursive.txt - gold-sas.txt", async () => {
      const file_a = "../../fixtures/gold-recursive.txt"
      const file_b = "../../fixtures/gold-sas.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-sas.txt - gold-show-spaces.txt", async () => {
      const file_a = "../../fixtures/gold-sas.txt"
      const file_b = "../../fixtures/gold-show-spaces.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-show-spaces.txt - gold-sns.txt", async () => {
      const file_a = "../../fixtures/gold-show-spaces.txt"
      const file_b = "../../fixtures/gold-sns.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-sns.txt - gold-strip-cr-off.txt", async () => {
      const file_a = "../../fixtures/gold-sns.txt"
      const file_b = "../../fixtures/gold-strip-cr-off.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-strip-cr-off.txt - gold-strip-cr-on.txt", async () => {
      const file_a = "../../fixtures/gold-strip-cr-off.txt"
      const file_b = "../../fixtures/gold-strip-cr-on.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-strip-cr-on.txt - gold-subcolors-bad-cat", async () => {
      const file_a = "../../fixtures/gold-strip-cr-on.txt"
      const file_b = "../../fixtures/gold-subcolors-bad-cat"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-subcolors-bad-cat - gold-subcolors-bad-color", async () => {
      const file_a = "../../fixtures/gold-subcolors-bad-cat"
      const file_b = "../../fixtures/gold-subcolors-bad-color"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-subcolors-bad-color - gold-subcolors-bad-fmt", async () => {
      const file_a = "../../fixtures/gold-subcolors-bad-color"
      const file_b = "../../fixtures/gold-subcolors-bad-fmt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-subcolors-bad-fmt - gold-tabs-4.txt", async () => {
      const file_a = "../../fixtures/gold-subcolors-bad-fmt"
      const file_b = "../../fixtures/gold-tabs-4.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-tabs-4.txt - gold-tabs-default.txt", async () => {
      const file_a = "../../fixtures/gold-tabs-4.txt"
      const file_b = "../../fixtures/gold-tabs-default.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("gold-tabs-default.txt - input-1.txt", async () => {
      const file_a = "../../fixtures/gold-tabs-default.txt"
      const file_b = "../../fixtures/input-1.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-1.txt - input-10.txt", async () => {
      const file_a = "../../fixtures/input-1.txt"
      const file_b = "../../fixtures/input-10.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-10.txt - input-11.txt", async () => {
      const file_a = "../../fixtures/input-10.txt"
      const file_b = "../../fixtures/input-11.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-11.txt - input-2.txt", async () => {
      const file_a = "../../fixtures/input-11.txt"
      const file_b = "../../fixtures/input-2.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-2.txt - input-3.txt", async () => {
      const file_a = "../../fixtures/input-2.txt"
      const file_b = "../../fixtures/input-3.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-3.txt - input-4-cr.txt", async () => {
      const file_a = "../../fixtures/input-3.txt"
      const file_b = "../../fixtures/input-4-cr.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-4-cr.txt - input-4-partial-cr.txt", async () => {
      const file_a = "../../fixtures/input-4-cr.txt"
      const file_b = "../../fixtures/input-4-partial-cr.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-4-partial-cr.txt - input-4.txt", async () => {
      const file_a = "../../fixtures/input-4-partial-cr.txt"
      const file_b = "../../fixtures/input-4.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-4.txt - input-5-cr.txt", async () => {
      const file_a = "../../fixtures/input-4.txt"
      const file_b = "../../fixtures/input-5-cr.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-5-cr.txt - input-5.txt", async () => {
      const file_a = "../../fixtures/input-5-cr.txt"
      const file_b = "../../fixtures/input-5.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-5.txt - input-6.txt", async () => {
      const file_a = "../../fixtures/input-5.txt"
      const file_b = "../../fixtures/input-6.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-6.txt - input-7.txt", async () => {
      const file_a = "../../fixtures/input-6.txt"
      const file_b = "../../fixtures/input-7.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-7.txt - input-8.txt", async () => {
      const file_a = "../../fixtures/input-7.txt"
      const file_b = "../../fixtures/input-8.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-8.txt - input-9.txt", async () => {
      const file_a = "../../fixtures/input-8.txt"
      const file_b = "../../fixtures/input-9.txt"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("input-9.txt - jsondiffpatch.json", async () => {
      const file_a = "../../fixtures/input-9.txt"
      const file_b = "../../fixtures/jsondiffpatch.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("jsondiffpatch.json - long_text_from.json", async () => {
      const file_a = "../../fixtures/jsondiffpatch.json"
      const file_b = "../../fixtures/long_text_from.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("long_text_from.json - long_text_to.json", async () => {
      const file_a = "../../fixtures/long_text_from.json"
      const file_b = "../../fixtures/long_text_to.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("long_text_to.json - move_from.json", async () => {
      const file_a = "../../fixtures/long_text_to.json"
      const file_b = "../../fixtures/move_from.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

    it("move_from.json - move_to.json", async () => {
      const file_a = "../../fixtures/move_from.json"
      const file_b = "../../fixtures/move_to.json"
      const text_a = (await readFile(file_a)).toString().replace(/\r\n/g, '\n')
      const text_b = (await readFile(file_b)).toString().replace(/\r\n/g, '\n')
      await assertTextChange(text_a, text_b)
    })
    

});
  