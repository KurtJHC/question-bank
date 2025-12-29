import { auth } from "@clerk/tanstack-react-start/server";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import ClerkProvider from "../integrations/clerk/provider";
import appCss from "../styles.css?url";

const queryClient = new QueryClient();

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
	const { userId } = await auth();

	return {
		userId,
	};
});

export const Route = createRootRoute({
	beforeLoad: async () => {
		const { userId } = await fetchClerkAuth();

		return { userId };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: () => <div>Not Found</div>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ClerkProvider>
					<QueryClientProvider client={queryClient}>
						{children}
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								{
									name: "React Query",
									render: <ReactQueryDevtoolsPanel />,
								},
							]}
						/>
					</QueryClientProvider>
				</ClerkProvider>
				<Scripts />
			</body>
		</html>
	);
}
