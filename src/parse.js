export const parseActions = (actionsText) => {
	const lines = actionsText.split('\n').filter(line => line.trim() !== '');
	const actions = [];

	let currentThought = null;
	let currentAction = null;
	let currentActionInput = null;
	for (let line of lines) {
		line = line.trim();
		if (line.startsWith('Thought: ')) {
			currentThought = line.substring('Thought: '.length).trim();
		} else if (line.startsWith('Action: ')) {
			currentAction = line.substring('Action: '.length).trim();
		} else if (line.startsWith('Action Input: ')) {
			const actionInput = line.substring('Action Input: '.length).trim();
			currentActionInput = JSON.parse(actionInput);
		}
			if(currentThought !== null && currentAction !== null && currentActionInput !== null){
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
