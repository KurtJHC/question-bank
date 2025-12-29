import { useQuery } from "@tanstack/react-query";
import { createLink, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../components/ui/pagination";

const useQuestionsPagination = () => {
	const { pageNumber } = useParams({ from: "/questions/$pageNumber" });
	const { data } = useQuery({
		queryKey: ["question_ids"],
		queryFn: () => fetch("/questions.json").then((res) => res.json()),
		gcTime: Infinity,
		staleTime: Infinity,
	});
	return useMemo(() => {
		if (!data) return [];
		const currentIndex = data.findIndex((id: string) => id === pageNumber);
		if (currentIndex === -1) return [];
		const start = Math.max(0, currentIndex - 5);
		const end = Math.min(data.length, currentIndex + 6);
		return data.slice(start, end);
	}, [pageNumber, data]);
};

const PaginationItemLink = createLink(PaginationLink);
const PaginationPreviousLink = createLink(PaginationPrevious);
const PaginationNextLink = createLink(PaginationNext);

export const QuestionsNavigation = () => {
	const { pageNumber } = useParams({ from: "/questions/$pageNumber" });
	const paginationItems = useQuestionsPagination();
	const currentQuestionIndex = paginationItems.findIndex(
		(id: string) => id === pageNumber,
	);
	const previousQuestionIndex = currentQuestionIndex - 1;
	const nextQuestionIndex = currentQuestionIndex + 1;
	if (paginationItems.length === 0) return null;

	return (
		<Pagination>
			<PaginationContent className="gap-4">
				<PaginationItem>
					<PaginationPreviousLink
						disabled={previousQuestionIndex < 0}
						to={"/questions/$pageNumber"}
						params={{ pageNumber: paginationItems[previousQuestionIndex] }}
					/>
				</PaginationItem>
				{paginationItems.map((id: string) => (
					<PaginationItem key={id}>
						<PaginationItemLink
							className="size-10"
							to={"/questions/$pageNumber"}
							params={{ pageNumber: id }}
							isActive={id === pageNumber}
						>
							{id}
						</PaginationItemLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNextLink
						disabled={nextQuestionIndex >= paginationItems.length}
						to={"/questions/$pageNumber"}
						params={{ pageNumber: paginationItems[nextQuestionIndex] }}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
