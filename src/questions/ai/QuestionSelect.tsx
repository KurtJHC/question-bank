import { observable } from "@legendapp/state";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

export const selectedQuestionId$ = observable<string>("");

export const QuestionSelect = () => {
	const [questionIds, setQuestionIds] = useState<string[]>([]);

	useEffect(() => {
		const questions = document.querySelectorAll(".question-bank");
		const ids = Array.from(questions).map(
			(question) => question.id.split("-")[1],
		);
		setQuestionIds(ids);
	}, []);

	const handleSelect = useCallback((id: string) => {
		selectedQuestionId$.set(id);
	}, []);

	return (
		<div className="flex flex-wrap gap-2">
			{questionIds.map((id) => (
				<Button key={id} onClick={() => handleSelect(id)}>
					{id}
				</Button>
			))}
		</div>
	);
};
