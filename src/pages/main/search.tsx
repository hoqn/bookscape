import SearchResult from "@/components/book-search-result";
import Header from "@/components/common/header.new";
import SearchInput from "@/components/search-input";
import { motion } from "framer-motion";
import { ChangeEventHandler, FormEventHandler, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import $ from "./search.module.css";
import LoadingIndicator from "@/components/ui/loading-indicator";

function SearchFallback() {
  return (
    <div className={$["fallback"]}>
      <div className={$["fallback__indicator"]}>
        <LoadingIndicator />
      </div>
      <div className={$["fallback__text"]}>
        <p>책을 찾고 있어요!</p>
      </div>
    </div>
  )
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedSearchQuery = useMemo(() => searchParams.get("q"), [searchParams]);

  const [searchQuery, setSearchQuery] = useState<string>(requestedSearchQuery || "");
  const [searchType, setSearchType] = useState<"paperbook"|"ebook"|"all">("all");

  const doOnSearchTypeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (searchType !== e.currentTarget.value)
      setSearchType(e.currentTarget.value as typeof searchType);
  };

  const doOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // navigate(`/search?q=${searchQuery}`, { preventScrollReset: true });
    if (document && document.activeElement && "blur" in document.activeElement) {
      (typeof document.activeElement.blur === "function") && document.activeElement.blur();
    }
    setSearchParams(prev => { 
      prev.set("q", searchQuery);
      return prev;
    });
  };

  return <>
    <Header title="책 찾기" transparent largeTitle subHeader={
      <div className={$["search-input-container"]}>
        <form onSubmit={doOnSubmit}>
          <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.currentTarget.value)} />
        </form>
      </div>
    }/>

    <div className={$["body"]}>
      <motion.div className={$["search-type-container"]} layout>
        <span className={$["search-type"]}>
          <input className={$["search-type__input"]} type="radio" name="book_type" id="book_type-all" value="all" checked={searchType === "all"} onChange={doOnSearchTypeChange} />
          <label className={$["search-type__label"]} htmlFor="book_type-all">
            모두
          {searchType === "all" && <motion.div className={$["search-type__active-bg"]} layoutId="type_underline"></motion.div> }
            </label>
        </span>
        <span className={$["search-type"]}>
          <input className={$["search-type__input"]} type="radio" name="book_type" id="book_type-ebook" value="ebook" checked={searchType === "ebook"} onChange={doOnSearchTypeChange} />
          <label className={$["search-type__label"]} htmlFor="book_type-ebook">
            전자책
          {searchType === "ebook" && <motion.div className={$["search-type__active-bg"]} layoutId="type_underline"></motion.div> }
            </label>
        </span>
        <span className={$["search-type"]}>
          <input className={$["search-type__input"]} type="radio" name="book_type" id="book_type-paperbook" value="paperbook" checked={searchType === "paperbook"} onChange={doOnSearchTypeChange}/>
          <label className={$["search-type__label"]} htmlFor="book_type-paperbook">
            종이책
          {searchType === "paperbook" && <motion.div className={$["search-type__active-bg"]} layoutId="type_underline"></motion.div> }
            </label>
        </span>
      </motion.div>

      <div className={$["body-sub"]}>
        <Suspense fallback={<SearchFallback />}>
        { requestedSearchQuery?.length ? (
            <SearchResult searchQuery={requestedSearchQuery} />
          ) : (
            <p>
              검색어를 입력하세요!
            </p>
          )
        }
        </Suspense>
      </div>

    </div>
  </>;
}
