#!/usr/bin/env bun

import { readdirSync } from "node:fs";

const generateQuestionsJson = async () => {
	const questionsDir = "public/question_htmls";
	const csvFile = "public/questions.json";
	const entries = readdirSync(questionsDir);
	const questions = entries
		.filter((entry) => entry.endsWith(".html"))
		.map((entry) => entry.replace(/\.html$/, ""))
		.sort((a, b) => parseInt(a) - parseInt(b));
	await import("node:fs/promises").then(fs =>
		fs.writeFile(csvFile, JSON.stringify(questions, null, 2))
	);
};

generateQuestionsJson()