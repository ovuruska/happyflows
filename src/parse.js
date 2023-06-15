import * as path from "path";

export const parseActions = (response,root = ".") => {
	const lines = response.split('\n').filter(line => line.trim() !== '');
	const actions = [];

	let currentThought = null;
	let currentAction = null;
	let currentActionInput = null;
	let contentFlag = false;
	for (let line of lines) {
		if (line.startsWith('Thought: ')) {
			currentThought = line.trim().substring('Thought: '.length).trim();
		} else if (line.startsWith('Action: ')) {
			currentAction = line.trim().substring('Action: '.length).trim();
		} else if (line.startsWith('Action Input: ')) {
			const actionInput = line.trim().substring('Action Input: '.length).trim();
			currentActionInput = JSON.parse(actionInput);
			if(currentActionInput.path){
				currentActionInput.path = path.join(root,currentActionInput.path);
			}
			continue;
		}else if(line.trim().startsWith('---')){
			contentFlag = !contentFlag;
		}else if(contentFlag){
			currentActionInput = currentActionInput || {};
			currentActionInput.content = currentActionInput.content || '';
			currentActionInput.content += line + '\n';
		}
		if(currentThought !== null && currentAction !== null && currentActionInput !== null && !contentFlag){
			const actionObj = {
				thought: currentThought,
				action: currentAction,
				actionInput: currentActionInput,
			};

			actions.push(actionObj);
			currentThought = null;
			currentAction = null;
			currentActionInput = null;
		}
	}

	return actions;
}
