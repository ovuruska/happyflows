import {change_directory, create_file, create_folder, run_command} from "../src/api.js";

jest.mock('fs', () => ({
	writeFileSync: jest.fn(),
	mkdirSync: jest.fn(),
}));
jest.mock('child_process', () => ({
	exec:jest.fn()
}));

import fs from 'fs';
import * as child_process from 'child_process';
describe('happyflow', () => {

	afterAll(() => {
		jest.restoreAllMocks();
	});
	describe('create_file', () => {
		it('should create a file', () => {
			const spy = jest.spyOn(fs,'writeFileSync');
			create_file('test.txt');
			expect(spy).toHaveBeenCalledWith('test.txt', '');
		});
	});
	describe('create_folder', () => {
		it('should create a folder', () => {
			const spy = jest.spyOn(fs,'mkdirSync');
			create_folder('test');
			expect(spy).toHaveBeenCalledWith('test');
		});
	});
	describe('change_directory', () => {
		it('should change directory', () => {
			const spy = jest.spyOn(process,'chdir');
			spy.mockImplementation(() => {});
			change_directory('test');
			expect(spy).toHaveBeenCalledWith('test');
		});
	});
	describe('run_command', () => {
		it('should run a command', () => {
			const spy = jest.spyOn(child_process,"exec");
			run_command('test')
			expect(spy).toHaveBeenCalledWith('test',expect.anything());
		});
	});


});
