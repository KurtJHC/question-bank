import { groq } from "@ai-sdk/groq";
import { chat, toServerSentEventsStream } from "@tanstack/ai";
import { createFileRoute } from "@tanstack/react-router";
import {
	convertToModelMessages,
	stepCountIs,
	streamText,
	type UIMessage,
} from "ai";
import { adapter } from "@/integrations/gemini/adapter";
import {
	getQuestionPageHtmlTool,
	getQuestionToolConfig,
} from "@/questions/ai/tools/getQuestionTool";

const tanstackHandler = async ({ request }: { request: Request }) => {
	const { messages, conversationId } = await request.json();

	try {
		const stream = chat({
			adapter: adapter,
			messages,
			conversationId,
			systemPrompts: [
				"You are a tutor, help the user answer the questions. Answer in markdown format.",
			],
			tools: [getQuestionPageHtmlTool],
		});

		return new Response(toServerSentEventsStream(stream));
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "An error occurred",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};

const groqHandler = async ({ request }: { request: Request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	const result = streamText({
		model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
		messages: await convertToModelMessages(messages),
		system:
			"You are a tutor, help the user answer the questions. Answer in markdown format.",
		tools: {
			questionFetcher: getQuestionToolConfig,
		},
		stopWhen: stepCountIs(3),
	});

	return result.toUIMessageStreamResponse();
};

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: groqHandler,
		},
	},
});
