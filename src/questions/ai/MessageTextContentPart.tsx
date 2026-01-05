import { MemoizedMarkdown } from "../memoized-markdown";

export const MessageTextContentPart = ({
	text,
	id,
}: {
	text: string;
	id: string;
}) => {
	return (
		<div className="p-2 prose">
			<MemoizedMarkdown content={text} id={id} />
		</div>
	);
};
