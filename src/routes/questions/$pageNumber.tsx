import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ChatDialog } from "@/questions/ai/ChatDialog";
import { QuestionContent } from "@/questions/QuestionContent";
import { QuestionsNavigation } from "@/questions/QuestionsNavigation";

export const Route = createFileRoute("/questions/$pageNumber")({
	// beforeLoad: async ({ context }: { context: { userId: string } }) => {
	// 	const { userId } = context;
	// 	if (!userId) {
	// 		throw redirect({ to: "/" });
	// 	}
	// },
	component: RouteComponent,
	head: () => ({
		links: [
			{
				rel: "stylesheet",
				href: "/static/runner/css/test_runner.css",
			},
			{
				rel: "stylesheet",
				href: "/static/ui/css/style.css",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<div className="p-4">
			<div className="py-1 px-2 shadow-sm rounded-md flex items-center justify-between sticky top-1 z-10 bg-neutral-50 border">
				<Link to="/" className="text-sm font-medium">
					Home
				</Link>
				<QuestionsNavigation />

				<ChatDialog />
			</div>

			<div className="mt-2">
				<QuestionContent />
			</div>
		</div>
	);
}
