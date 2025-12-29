import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";

export const GoToQuestion = () => {
	const questionIdInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate({ from: "/" });
	const { data } = useQuery({
		queryKey: ["question_ids"],
		queryFn: () => fetch("/questions.json").then((res) => res.json()),
		gcTime: Infinity,
		staleTime: Infinity,
	});

	const handleQuestion = useCallback(() => {
		const questionId = questionIdInput.current?.value;
		if (!questionId) return;
		navigate({ to: `/questions/${questionId}` });
	}, [navigate]);

	if (!data) return <Spinner />;

	return (
		<div className="flex items-center justify-center gap-4">
			<Button onClick={handleQuestion}>Go to Page</Button>
			<input
				type="number"
				ref={questionIdInput}
				className="border w-24 p-2"
				defaultValue={data?.[0]}
			/>
		</div>
	);
};
