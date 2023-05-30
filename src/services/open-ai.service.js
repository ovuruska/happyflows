import { Configuration, OpenAIApi} from "openai";

export class OpenaiService {
	constructor(apiKey) {
		this.configuration = new Configuration({
			apiKey,
		});
		this.openaiClient = new OpenAIApi(this.configuration);

	}
	async getCompletion(messages,model = "gpt-3.5-turbo",temperature = 0,maxTries  = 5) {
		try {
			const completion = await this.openaiClient.createChatCompletion(
				{
					model,
					messages,
					temperature,
				});
			return completion.data.choices[0].message.content;

		} catch (e) {
			if (maxTries > 0) {
				return this.getCompletion(messages, model, temperature, maxTries - 1);
			} else {
				throw e;
			}
		}
	}
}
