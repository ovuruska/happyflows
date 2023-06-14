import {change_directory, create_file, create_folder, read_file, run_command} from "./api.js";

export function executeActions(actions) {
	let root = '.';
	const response = [];

	for (const actionObject of actions) {
		const { action, actionInput } = actionObject;
		const filePath = `${root}/${actionInput.path}`;
		const content = `${actionInput.content}`;
		const folderPath = `${actionInput.path}`;
		switch (action) {
			case 'create_folder':
				create_folder(folderPath);
				break;

			case 'change_directory':
				const newPath = `${actionInput.path}`;
				change_directory(newPath);
				root = newPath;
				break;
			case 'write_file':
				create_file(filePath, content);
				break;
			case 'create_file':
				create_file(filePath);
				break;
			case 'run_command':
				const command = `${actionInput.command}`;
				run_command(command);
				break;
			case  'read_file':
				const fileContent =  read_file(filePath);
				response.push([{
					"action": action,
					"actionInput": actionInput,
					"content": fileContent
				}])


			default:
				console.log('Unknown action type:', action);
		}
	}
	return response;
}





