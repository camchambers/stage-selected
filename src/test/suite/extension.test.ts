import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('ch4mb3rs.stage-selected'));
	});

	test('Extension should activate', async () => {
		const extension = vscode.extensions.getExtension('ch4mb3rs.stage-selected');
		if (extension && !extension.isActive) {
			await extension.activate();
		}
		assert.ok(extension?.isActive);
	});

	test('Stage Selected command should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('stage-selected.stageSelected'));
	});
});
