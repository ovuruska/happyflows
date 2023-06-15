#!/usr/bin/env node
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import inquirer from 'inquirer';
import {OpenaiService} from "./services/open-ai.service.js";
import loading from "loading-cli";
import {loadingArray} from "./loading.js";
import {parseActions} from "./parse.js";
import {executeActions} from "./happyflow.js";
import {loginCommand} from "./commands/login.js";
import ConfigStore from "configstore";
import {VectorDbService} from "./services/vector-db.service.js";

const config = new ConfigStore('happyflow');

const load = loading({
	frames: loadingArray, text: "Generating the project", interval: 150,
});

yargs(hideBin(process.argv))
	.command('$0', 'interactive prompt for user', () => {
	}, async () => {

		const vectorDbService = VectorDbService.getInstance();
		const promise = await vectorDbService.init();
		await loginCommand();
		const {program} = await inquirer.prompt([{
			name: 'program', type: 'input', message: 'Explain your program in a few words: ',
		},]);


		load.start("Learning the codex.");
		await promise;
		load.stop();


		let response = null;
		try {
			load.start();
			const openAiService = new OpenaiService(config.get('apiKey'));
			const embedding = await openAiService.getEmbedding(program);
			const {item:{
				metadata
			}} = await vectorDbService.query(embedding);
			const {promptFile} = metadata;
			const {prompt} = await import(promptFile);

			const messages = [{
				role: "system", content:prompt
			}, {
				role: "user", content: program
			}];
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

	.option('verbose', {
		alias: 'v', type: 'boolean', description: 'Run with verbose logging',
	}).argv;

