#!/usr/bin/env node
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import inquirer from 'inquirer';
import ConfigStore from 'configstore';
import {softwareEngineer} from './prompts/program.prompt.js';
import {OpenaiService} from "./services/open-ai.service.js";
import loading from "loading-cli";
import {loadingArray} from "./loading.js";
import {parseActions} from "./parse.js";
import fs from "fs";
import {executeActions} from "./happyflow.js";
import {softwareEngineerFill} from "./prompts/fill.prompt.js";
import {parseFill} from "./parse-fill.js";

const config = new ConfigStore('happyflow');
const load = loading({
	frames: loadingArray, text: "Generating the project", interval: 150,
});

yargs(hideBin(process.argv))
	.command('$0', 'interactive prompt for user', () => {
	}, async () => {
		const openAiKey = config.get('apiKey');
		if (!openAiKey) {
			const {apiKey} = await inquirer.prompt([{
				name: 'apiKey', type: 'input', message: 'Enter your OpenAI API key: ',
			}]);
			config.set('apiKey', apiKey);

		}
		const {program} = await inquirer.prompt([{
			name: 'program', type: 'input', message: 'Explain your program in a few words: ',
		},]);

		const messages = [{
			role: "system", content: softwareEngineer
		}, {
			role: "user", content: program
		}];
		let response = null;
		try {
			load.start();
			const openAiService = new OpenaiService(config.get('apiKey'));
			response = await openAiService.getCompletion(messages);


		} catch (e) {
			console.error(e);
			config.delete('apiKey');
			process.exit(0);

			console.error("Problem occurred with OpenAI API key")
		} finally {
			load.stop();

		}
		const creatingFilesLoad = loading({
			frames: loadingArray, text: "Bootstrapping project files", interval: 150,
		});
		creatingFilesLoad.start();
		const actions = parseActions(response);
		executeActions(actions);
		creatingFilesLoad.stop();
	})
	.command('generate', 'initialize from action file', {
		actionFile: {
			alias: 'f', type: 'string', description: 'Path to action file',

		}
	}, (argv) => {
		const actions = parseActions(fs.readFileSync(argv.actionFile, 'utf8'));
		executeActions(actions);

	})
	.command('fill', 'fill a folder with files and subfolders.', {
	},async (argv)=>{
		const openAiKey = config.get('apiKey');
		if (!openAiKey) {
			const {apiKey} = await inquirer.prompt([{
				name: 'apiKey', type: 'input', message: 'Enter your OpenAI API key: ',
			}]);
			config.set('apiKey', apiKey);

		}
		// Get first argument
		const folderName = argv._[1] || ".";
		const {program} = await inquirer.prompt([{
			name: 'program', type: 'input', message: 'Explain your program in a few words: ',
		},]);
		const messages = [{
			role: "system", content: softwareEngineerFill
		}, {
			role: "user", content: program
		}];
		let response = null;
		try {
			load.start();
			const openAiService = new OpenaiService(config.get('apiKey'));
			response = await openAiService.getCompletion(messages);
			fs.writeFileSync('response.json', response.toString(), null, 2);


		} catch (e) {
			config.delete('apiKey');
			process.exit(0);

			console.error("Problem occured with OpenAI API key")
		} finally {
			load.stop();
		}
		const creatingFilesLoad = loading({
			frames: loadingArray, text: "Bootstrapping project files", interval: 150,
		});
		creatingFilesLoad.start();
		const actions = parseFill(response);
		executeActions(actions);
		creatingFilesLoad.stop();

	})
	.option('verbose', {
		alias: 'v', type: 'boolean', description: 'Run with verbose logging',
	}).argv;

