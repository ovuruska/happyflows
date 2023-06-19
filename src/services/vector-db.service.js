import {glob,  globSync} from "glob";
import {readFileSync,unlinkSync,existsSync} from "fs";
import {LocalIndex} from "vectra";
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export class VectorDbService {
	static instance;

	constructor() {
		this.indexDir = path.join(__dirname, ".index");
		this.indexPath = path.join(this.indexDir, "index.json");
		if(existsSync(this.indexPath)){
			unlinkSync(this.indexPath);
		}

		this.index = new LocalIndex(this.indexDir);
	}

	async init() {
		if (!await this.index.isIndexCreated()) {
			await this.index.createIndex();
		}
		const embeddingFilesGlob = __dirname + "../../**/*.embedding.json";
		const embeddingFiles = globSync(embeddingFilesGlob);

		return Promise.all(embeddingFiles.map(async (embeddingFile) => {
			const embeddingData = JSON.parse(await readFileSync(embeddingFile, 'utf-8'));
			const promptFile = embeddingFile.replace("embedding.json", "prompt.js");
			const {
				data
			} = embeddingData;
			let embedding;
			if(data && data.length > 0){
				embedding = data[0].embedding;
			}
			else{
				embedding = data.embedding;
			}
			return this.index.insertItem({
				vector: embedding, metadata: {
					promptFile,
				}
			});
		}));

	}

	static getInstance() {
		if (!VectorDbService.instance) {
			VectorDbService.instance = new VectorDbService();
		}
		return VectorDbService.instance;
	}

	async query(vector, limit = 1) {
		const results = await this.index.queryItems(vector, limit);
		return results[0];
	}

}
