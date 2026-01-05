import { useValue } from "@legendapp/state/react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChatMessages } from "./ChatMessages";
import { QuestionSelect, selectedQuestionId$ } from "./QuestionSelect";

export function ChatDialog() {
	const selectedQuestionId = useValue(selectedQuestionId$);
	const handleOpenChange = useCallback((open: boolean) => {
		if (!open) {
			selectedQuestionId$.set("");
		}
	}, []);

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline">AI Chat</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[90%]">
				{selectedQuestionId ? <ChatMessages /> : <QuestionSelect />}
			</DialogContent>
		</Dialog>
	);
}
