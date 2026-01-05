import { useChat } from "@ai-sdk/react";
import { useValue } from "@legendapp/state/react";
import { useParams } from "@tanstack/react-router";
import type { UIMessage } from "ai";
import { AlertCircleIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { MessageTextContentPart } from "@/questions/ai/MessageTextContentPart";
import { Alert, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { MessageQuestionPart } from "./MessageQuestionPart";
import { selectedQuestionId$ } from "./QuestionSelect";

// const sendMessage = ({ text }: { text: string }) => {
// 	console.log("sendMessage");
// };
export const ChatMessages = () => {
	const messageInput = useRef<HTMLInputElement>(null);
	const selectedQuestionId = useValue(selectedQuestionId$);

	const { pageNumber } = useParams({
		from: "/questions/$pageNumber",
	});

	const { messages, sendMessage, error, status } = useChat<UIMessage>();
	console.log(error);
	const isLoading = status === "streaming";

	const handleSendMessage = useCallback(
		(message: string) => {
			if (!messageInput.current?.value.trim() || isLoading) return;

			sendMessage({ text: message });
			messageInput.current.value = "";
		},
		[sendMessage, isLoading],
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleSendMessage(messageInput.current?.value ?? "");
			}
		},
		[handleSendMessage],
	);

	return (
		<div className="flex flex-col gap-2 h-full">
			<div className="flex flex-col gap-2 flex-1 max-h-[620px] overflow-y-auto">
				{messages.map((message) => (
					<div
						key={message.id}
						className={cn(
							"p-2 border border-gray-200 rounded-md",
							message.role !== "user" && "bg-gray-100",
						)}
					>
						<div className="text-sm text-gray-400">
							{message.role === "user" ? "USER: " : "AI: "}
						</div>
						{message.parts.map((part, i) => {
							switch (part.type) {
								case "text":
									return (
										<MessageTextContentPart
											id={message.id}
											key={`${message.id}-${i}`}
											text={part.text}
										/>
									);
								case "tool-questionFetcher":
									return (
										<MessageQuestionPart
											id={message.id}
											key={`${message.id}-${part.toolCallId}-${i}`}
											output={
												(part.output as { questionMarkdown: string }) ?? {
													questionMarkdown: "",
												}
											}
										/>
									);
								default:
									return null;
							}
						})}
					</div>
				))}
			</div>
			{error && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>Error: {error.message}</AlertTitle>
				</Alert>
			)}
			<div className="flex items-center gap-2">
				<Input
					placeholder="Type a message..."
					ref={messageInput}
					onKeyDown={handleKeyDown}
				/>
				<Button
					disabled={isLoading}
					onClick={() => handleSendMessage(messageInput.current?.value ?? "")}
				>
					Send
				</Button>
			</div>
			<div>
				<Button
					disabled={isLoading}
					size="sm"
					variant="outline"
					onClick={() => {
						sendMessage({
							text: `Provide answer for question ${selectedQuestionId} on page ${pageNumber}`,
						});
					}}
				>
					Answer question {selectedQuestionId} on page {pageNumber}
				</Button>
			</div>
		</div>
	);
};
