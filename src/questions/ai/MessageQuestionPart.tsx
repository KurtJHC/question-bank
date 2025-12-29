export const MessageQuestionPart = ({
	output,
}: {
	output: { questionHtml: string };
}) => {
	return (
		<div className="p-2 border border-gray-200 rounded-md max-h-[300px] overflow-y-auto">
			<div
				className="question-bank-content"
				// biome-ignore lint: HTML content is from trusted local files; id is required for CSS styling
				dangerouslySetInnerHTML={{ __html: output.questionHtml }}
			/>
		</div>
	);
};
