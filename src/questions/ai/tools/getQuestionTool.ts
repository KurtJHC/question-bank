import { createDocument } from "@mixmark-io/domino";
import { toolDefinition } from "@tanstack/ai";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { z } from "zod";

const getQuestionPageHtmlToolDef = toolDefinition({
	name: "get_question_page_html",
	description: "Get the question html from API",
	inputSchema: z.object({
		page: z
			.number()
			.describe("The page number of the question to get the html from"),
	}) as z.ZodType,
	outputSchema: z.object({
		pageHtml: z.string().describe("The html of the question"),
	}) as z.ZodType,
});

export const getQuestionPageHtmlTool = getQuestionPageHtmlToolDef.server(
	async ({ page }: any) => {
		// const turndownService = new TurndownService();
		const pageHtml = await fetch(
			`https://kurtjhc.github.io/question-bank/public/question_htmls/${page}.html`,
		).then((res) => res.text());
		// const markdown = turndownService.turndown(pageHtml);
		return {
			pageHtml,
		};
	},
);

export const getQuestion = async ({
	page,
	questionId,
}: z.infer<typeof inputSchema>) => {
	const pageUrl = `https://kurtjhc.github.io/question-bank/public/question_htmls/${page}.html`;
	const pageHtml = await fetch(pageUrl).then((res) => res.text());
	const $ = cheerio.load(pageHtml);
	const questionHtml = $(`#question-${questionId}`).html();
	const images = $(`#question-${questionId} img`)
		.map((i, img) => $(img).attr("src"))
		.get();

	const htmlDocument = createDocument(questionHtml ?? "");
	const turndownService = new TurndownService({
		hr: "---",
		codeBlockStyle: "fenced",
	});
	const questionMarkdown = turndownService.turndown(htmlDocument);

	return {
		questionMarkdown,
		images,
	};
};

const inputSchema = z.object({
	page: z
		.string()
		.describe("The page number of the question to get the html from"),
	questionId: z
		.string()
		.describe("The id of the question to get the html from"),
});

export const getQuestionToolConfig = {
	description: "Get the question markdown from API",
	inputSchema,
	execute: getQuestion,
	toModelOutput: (result: {
		output: { questionMarkdown: string; images: string[] };
	}) => {
		const messages: any[] = [
			{
				type: "text",
				text: result.output.questionMarkdown,
			},
		];

		for (const image of result.output.images) {
			messages.push({
				type: "image-url",
				url: image,
			});
		}

		return {
			type: "content",
			value: messages,
		};
	},
};
