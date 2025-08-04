import * as vscode from 'vscode';
import { CliPrettify } from 'markdown-table-prettify';

import { TABLE, CELL, HEADER, CELL_CONTENT, TABLE_CAPTION, ROW_WITHOUT_HEADER } from './constants';

const displayError = (message: string): void => {
	vscode.window.showErrorMessage(message);
};

export const isValidText = (): boolean => {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		if (editor.document.languageId === 'mdc' || editor.document.languageId === 'markdown') {
			if (editor.document.getText(editor.selection)) {
				return true;
			} else {
				displayError('No text selected to convert.');
			}
		} else {
			displayError('This command can only be used in Markdown files.');
		}
	} else {
		displayError('No active text editor found.');
	}

	return false;
};

export const htmlTableToMarkdown = (html: string): string => {
	const match = html.match(TABLE);
	if (match) {
		let tableHeader = '|';
		let tableHeaderFooter = '|';
		let tableRows = '';
		let tableHeaderFound = false;
		let tableHeaderCellCount = 0;
		let prevRowCellCount = 0;
		let tableCaption = '';

		// Extract caption if present
		const captionMatch = html.match(TABLE_CAPTION);
		if (captionMatch) {
			tableCaption = `\n${captionMatch[1]}\n\n`;
		}

		// Process header
		const headerMatches = html.match(HEADER);
		if (headerMatches) {
			headerMatches.forEach(header => {
				const headerContent = header.replace(CELL_CONTENT, '').trim();
				tableHeader += ` ${headerContent} |`;
				tableHeaderFooter += ' --- |';
				tableHeaderFound = true;
				tableHeaderCellCount++;
			});
		}

		const rowMatches = html.match(ROW_WITHOUT_HEADER);
		if (rowMatches) {
			rowMatches.forEach(row => {
				let rowContent = '';
				const cellMatches = row.match(CELL);
				if (cellMatches) {
					cellMatches.forEach(cell => {
						const cellContent = cell.replace(CELL_CONTENT, '').trim();
						rowContent += ` ${cellContent} |`;
					});
					if (rowContent.trim()) {
						tableRows += `|${rowContent}\n`;
						if (prevRowCellCount && prevRowCellCount !== cellMatches.length) {
							displayError('HTML table rows do not have the same number of cells. Colspan not supported.');
							return html;
						}
						prevRowCellCount = cellMatches.length;
					}
				}
			});
		}

		if (tableHeaderFound) {
			if (tableHeaderCellCount !== prevRowCellCount) {
				displayError('The number of cells in your header does not match the number of cells in your rows.');
				return html;
			}
		} else {
			for (let i = 0; i < prevRowCellCount; i++) {
				tableHeader += '|';
				tableHeaderFooter += '--- |';
			}
		}

		return CliPrettify.prettify(`${tableCaption}${tableHeader}\n${tableHeaderFooter}\n${tableRows}`);
	} else {
		displayError('No valid HTML table found in the selected text.');
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
			displayError('Failed to replace HTML table with Markdown.');
		}
	});
};
