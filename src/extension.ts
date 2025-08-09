import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Stage Selected extension is now active!');

	// Register the stage selected command
	const stageSelectedDisposable = vscode.commands.registerCommand('stage-selected.stageSelected', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}

		const selection = editor.selection;
		if (selection.isEmpty) {
			vscode.window.showWarningMessage('No text selected');
			return;
		}

		try {
			// Use VS Code's built-in Git functionality to stage selected ranges
			await vscode.commands.executeCommand('git.stageSelectedRanges');
			vscode.window.showInformationMessage('Selected text staged successfully!');
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to stage selected text: ${error}`);
		}
	});

	context.subscriptions.push(stageSelectedDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
