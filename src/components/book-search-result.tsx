import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

import $ from "./book-search-result.module.css";

import type { RequestParams as ApiBookSearchReqParams, ResponseBody as ApiBookSearchResBody } from "@api/book/search";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import LoadingIndicator from "./ui/loading-indicator";

interface SearchResultProps {
  searchQuery: string;
}

export default function SearchResult({ searchQuery }: SearchResultProps) {

  const {
    data,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["book-search", searchQuery],
    queryFn: ({ pageParam }) =>
      axios
        .get<ApiBookSearchResBody>("/api/book/search", {
          params: {
            query: searchQuery,
            page: pageParam,
          } satisfies ApiBookSearchReqParams,
        })
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page < lastPage.meta.pageCount ? lastPage.meta.page + 1 : null,
  });

  const lastElementRef = useRef(null);
  const isLastInView = useInView(lastElementRef);

  useEffect(() => {
    if (fetchStatus === "fetching") return;
    else if (isLastInView) fetchNextPage();
  }, [fetchNextPage, fetchStatus, isLastInView]);

  return (
    <main className={$["body"]}>
      <div className={$["meta-info"]}>
        <div className={$["meta-info__total-count"]}>총 {data.pages[0]?.meta?.totalCount}권을 발견했어요.</div>
      </div>
      <ul className={$["result-list"]}>
        {data.pages.map(
          (page, i1) => page.items.map((it, i2) => (
          <li key={`${it.isbn}:${i1*10 + i2}`} className={$["result-item"]}>
            <Link to="#" className={$["result-item__link"]}>
              <div className={$["result-item__inner"]}>
                <div className={$["result-item__left"]}>
                  <img className={$["result-item__img"]} src={it.imageUrl?.length ? `https://cover.nl.go.kr/${it.imageUrl}` : ""} />
                </div>
                <div className={$["result-item__right"]}>
                  <div className={$["result-item__title"]} dangerouslySetInnerHTML={{ __html: it.title }}></div>
                  <div className={$["result-item__meta"]}>
                    <p dangerouslySetInnerHTML={{ __html: it.authors }}></p>
                    <p dangerouslySetInnerHTML={{ __html: it.pubYear }}></p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
          ))
        )}
      </ul>
      { hasNextPage ? (
        <div ref={lastElementRef}>
          { fetchStatus === "fetching" && (
            <div className={$["load-more"]}>
              <LoadingIndicator className={$["load-more__indicator"]} />
            </div>
          )}
        </div>
      ) : (
        <div className={$["end-of-result"]}>
          <p>마지막 책까지 표시했어요.</p>
        </div>
      )}
    </main>
  );
}
