import * as vscode from 'vscode';
import { htmlTableToMarkdown, isValidText, replaceHtmlTableWithMarkdown } from './converterFactory';

export function activate(context: vscode.ExtensionContext) {
	const command = 'html-table-to-markdown.convertTable';

	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand(command, () => {
			if (isValidText()) {
				replaceHtmlTableWithMarkdown((htmlTableToMarkdown()));
			}
		})
	);
}

export function deactivate() { }
