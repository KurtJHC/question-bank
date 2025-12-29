import { createGeminiChat, type GeminiTextConfig } from "@tanstack/ai-gemini";

const config: Omit<GeminiTextConfig, "apiKey"> = {};

export const adapter = createGeminiChat(
	"gemini-2.5-flash-lite",
	process.env.GEMINI_API_KEY ?? "",
	config,
);
