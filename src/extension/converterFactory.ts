import * as vscode from 'vscode';
import { TABLE, CELL, HEADER, ROW, CELL_CONTENT } from './constants';
import { CliPrettify } from 'markdown-table-prettify';

export const isValidText = (): boolean => {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		if (editor.document.languageId === 'mdc' || editor.document.languageId === 'markdown') {
			if (editor.document.getText(editor.selection)) {
				return true;
			} else {
				vscode.window.showErrorMessage('No text selected to convert.');
			}
		} else {
			vscode.window.showErrorMessage('This command can only be used in Markdown files.');
		}
	} else {
		vscode.window.showErrorMessage('No active text editor found.');
	}

	return false;
};

export const htmlTableToMarkdown = (): string => {
  const editor = vscode.window.activeTextEditor!;
  const html = editor.document.getText(editor.selection);

	const markdownTable: string[] = [];
	const match = html.match(TABLE);
	if (match) {
		const rows = match[1].match(ROW);
		if (rows) {
			rows.forEach((row, index) => {
				const cells = row.match(CELL);
				if (cells) {
					const markdownRow = cells.map(cell => {
						const content = cell.replace(CELL_CONTENT, '').trim();
						return content;
					}).join(' | ');
					if (index === 0) {
						// First row is header
						markdownTable.push(`| ${markdownRow} |`);
						// Add separator row
						const headerCells = row.match(HEADER);
						if (headerCells) {
							const separatorRow = headerCells.map(() => '---').join(' | ');
							markdownTable.push(`| ${separatorRow} |`);
						}
					} else {
						// Subsequent rows are data
						markdownTable.push(`| ${markdownRow} |`);
					}
				}
			});
		}
    
    return CliPrettify.prettify(markdownTable.join('\n'));
	} else {
    vscode.window.showErrorMessage('No valid HTML table found in the selected text.');
    return html; 
  }
};

export const replaceHtmlTableWithMarkdown = (markdownTable: string): void => {
  const editor = vscode.window.activeTextEditor!;
  const selection = editor.selection;
  editor.edit(editBuilder => {
    editBuilder.replace(selection, markdownTable);
  }).then(success => {
    if (!success) {
      vscode.window.showErrorMessage('Failed to replace HTML table with Markdown.');
    }
  });
};
