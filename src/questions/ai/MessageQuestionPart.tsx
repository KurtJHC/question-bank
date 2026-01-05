import { MemoizedMarkdown } from "../memoized-markdown";

export const MessageQuestionPart = ({
	output,
	id,
}: {
	output: { questionMarkdown: string };
	id: string;
}) => {
	return (
		<div className="p-2 border border-gray-200 rounded-md max-h-[300px] overflow-y-auto bg-white">
			<MemoizedMarkdown content={output.questionMarkdown} id={id} />
		</div>
	);
};
