// settings.js
import inquirer from 'inquirer';
import ConfigStore from "configstore";

const config = new ConfigStore('happyflow');

const selectModel = async () => {
	let back = false;
	while(!back) {
		const currentModel = config.get('model') || 'gpt-4';
		const {model} = await inquirer.prompt([
			{
				name: 'model',
				type: 'list',
				choices: [
					{name: `${currentModel === 'gpt-3.5-turbo' ? '●' : '○'} GPT-3.5`, value: 'gpt-3.5-turbo'},
					{name: `${currentModel === 'gpt-4' ? '●' : '○'} GPT-4`, value: 'gpt-4'},
					{name: 'Back', value: 'back'}
				],

			}
		]);

		if(model === 'back') {
			back = true;
		} else {
			config.set('model', model);
		}
	}
}

export async function settingsCommand() {
	let exit = false;
	while(!exit) {
		const {menuChoice} = await inquirer.prompt([
			{
				name: 'menuChoice',
				type: 'list',
				message: 'Settings',
				choices: ['Select Model', 'Exit']
			}
		]);

		if(menuChoice === 'Exit') {
			exit = true;
			continue;
		}

		if(menuChoice === 'Select Model') {
			await selectModel();
		}
	}
}
