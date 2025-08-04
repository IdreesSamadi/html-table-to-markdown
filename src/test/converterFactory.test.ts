import * as assert from 'assert';

import { htmlTableToMarkdown } from '../extension/converterFactory';

suite('HTML Table to Markdown Converter', () => {
  test('Converts simple table to markdown', () => {
    const htmlTable = `
            <table>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table with caption', () => {
    const htmlTable = `
            <table>
                <caption>Sample Table</caption>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `\nSample Table

| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table without header', () => {
    const htmlTable = `
            <table>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `|             |             |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table with multiple rows and cells', () => {
    const htmlTable = `
            <table>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
                <tr>
                    <td>Row 2 Col 1</td>
                    <td>Row 2 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table with colspan', () => {
    const htmlTable = `
            <table>
                <tr>
                    <th colspan="2">Header 1</th>
                    <th>Header 2</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table class and style', () => {
    const htmlTable = `
            <table class="my-table" style="width:100%">
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    const expectedMarkdown = `| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles table with THEAD and TFOOT and tbody', () => {
    const htmlTable = `
            <table>
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1 Col 1</td>
                        <td>Row 1 Col 2</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Footer 1</td>
                        <td>Footer 2</td>
                    </tr>
                </tfoot>
            </table>`;

    const expectedMarkdown = `| Header 1    | Header 2    |
|-------------|-------------|
| Row 1 Col 1 | Row 1 Col 2 |
| Footer 1    | Footer 2    |
`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), expectedMarkdown);
  });

  test('Handles invalid table structure', () => {
    const htmlTable = `
            <table>
                <tr>
                    <th>Header 1</th>
                </tr>
                <tr>
                    <td>Row 1 Col 1</td>
                    <td>Row 1 Col 2</td>
                </tr>
            </table>`;

    assert.strictEqual(htmlTableToMarkdown(htmlTable), htmlTable);
  });
});
