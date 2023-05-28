import fs from "fs";
import {exec} from "child_process";

export function create_file(path,content = '') {
	if(fs.existsSync(path)){
		fs.unlinkSync(path);
	}
	fs.mkdirSync(path.substring(0,path.lastIndexOf('/')),{
		force: true,
		recursive:true
	});
	fs.writeFileSync(path, content,{
		force: true,
		recursive:true
	});
}

export function create_folder(path) {
	fs.mkdirSync(path,{
		force: true,
	});
}

export function change_directory(path) {
	process.chdir(path);
}

export function run_command(command) {
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing command: ${error.message}`);
			return;
		}
		console.log(`Command output: ${stdout}`);
		console.error(`Command error: ${stderr}`);
	});
}
