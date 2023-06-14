import inquirer from "inquirer";
import ConfigStore from "configstore";

export const loginCommand = async (argv) => {
	const config = new ConfigStore('happyflow');
	const openAiKey = config.get('apiKey');
	if (!openAiKey) {
		const {apiKey} = await inquirer.prompt([{
			name: 'apiKey', type: 'input', message: 'Enter your OpenAI API key: ',
		}]);
		config.set('apiKey', apiKey);

	}
	return openAiKey;
}
