import { toolDefinition } from "@tanstack/ai";
import * as cheerio from "cheerio";
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
		const pageHtml = await fetch(
			`https://questions-bank.kurt-jing.workers.dev/question_htmls/${page}.html`,
		).then((res) => res.text());

		return {
			pageHtml,
		};
	},
);

export const getQuestionHtml = async ({
	host,
	page,
	questionId,
}: z.infer<typeof inputSchema>) => {
	const pageUrl = `${host}/question_htmls/${page}.html`;
	const pageHtml = await fetch(pageUrl).then((res) => res.text());
	const $ = cheerio.load(pageHtml);
	const questionHtml = $(`#question-${questionId}`).html();

	return {
		questionHtml,
	};
};

const inputSchema = z.object({
	host: z.url().describe("The current url"),
	page: z
		.string()
		.describe("The page number of the question to get the html from"),
	questionId: z
		.string()
		.describe("The id of the question to get the html from"),
});

export const getQuestionToolConfig = {
	description: "Get the question html from API",
	inputSchema,
	execute: getQuestionHtml,
};
