import * as vscode from 'vscode';

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

export const getSelectedText = (): string => {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		return editor.document.getText(editor.selection);
	}
	return '';
};

export const displayError = (message: string): void => {
	vscode.window.showErrorMessage(message);
};

export const replaceInEditor = (input: string): void => {
	const editor = vscode.window.activeTextEditor!;
	const selection = editor.selection;
	editor.edit(editBuilder => {
		editBuilder.replace(selection, input);
	}).then(success => {
		if (!success) {
			displayError('Failed to apply changes to the editor.');
		}
	});
};
