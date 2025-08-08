import * as vscode from 'vscode';

import { htmlTableToMarkdown } from './converterFactory';
import { formatMarkdownTable } from './formatterFactory';
import { getSelectedText, isValidText, replaceInEditor } from './util';
import { COMMAND_CONVERT, COMMAND_FORMAT } from './constants';

export function activate(context: vscode.ExtensionContext) {
	
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand(COMMAND_CONVERT, () => {
			if (isValidText()) {
				replaceInEditor(htmlTableToMarkdown(getSelectedText()));
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand(COMMAND_FORMAT, () => {
			if (isValidText()) {
				replaceInEditor(formatMarkdownTable(getSelectedText()));
			}
		})
	);
}

export function deactivate() { }
