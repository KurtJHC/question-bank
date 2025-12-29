import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { GoToQuestion } from "../questions/GoToQuestion";

export const Route = createFileRoute("/")({ component: App, ssr: false });

function App() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			{/* <SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton /> */}
			<GoToQuestion />
			{/* </SignedIn> */}
		</div>
	);
}
