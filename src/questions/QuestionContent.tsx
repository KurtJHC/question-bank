import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "../components/ui/spinner";

export const QuestionContent = () => {
	const { pageNumber } = useParams({ from: "/questions/$pageNumber" });
	const { data } = useQuery({
		queryKey: ["question", pageNumber],
		queryFn: () =>
			fetch(`/question_htmls/${pageNumber}.html`).then((res) => res.text()),
		gcTime: Infinity,
		staleTime: Infinity,
	});

	if (!data) return <Spinner />;

	return (
		<div
			className="question-bank-content"
			// biome-ignore lint: HTML content is from trusted local files; id is required for CSS styling
			dangerouslySetInnerHTML={{ __html: data }}
		/>
	);
};
