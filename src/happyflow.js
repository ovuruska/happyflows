import {change_directory, create_file, create_folder, run_command} from "./api.js";

export function executeActions(actions) {
	let root = '.';

	for (const actionObject of actions) {
		const { action, actionInput } = actionObject;
		switch (action) {
			case 'create_folder':
				const folderPath = `${actionInput.path}`;
				create_folder(folderPath);
				break;

			case 'change_directory':
				const newPath = `${actionInput.path}`;
				change_directory(newPath);
				root = newPath;
				break;

			case 'create_file':
				const filePath = `${actionInput.path}`;
				create_file(filePath);
				break;
			case 'run_command':
				const command = `${actionInput.command}`;
				run_command(command);
				break;

			default:
				console.log('Unknown action type:', action);
		}
	}
}





