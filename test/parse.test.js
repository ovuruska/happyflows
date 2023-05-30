import * as fs from "fs";
import * as path from "path";
import {parseFill} from "../src/parse-fill.js";

describe('Fill parser',()=>{
	it('should parse the fill response',()=>{
		const responsePath = path.join(__dirname,'response.actions');
		const response = fs.readFileSync(responsePath).toString();
		const actions = parseFill(response);
		expect(actions.length).toBe(8);
	});
});
