import Header from "@/components/common/header";
import $ from "./search.module.css"
import MaterialSymbol from "@/components/ui/material-symbol";
import { ChangeEventHandler, useState } from "react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [searchType, setSearchType] = useState<"paperbook"|"ebook">("ebook");

  const doOnSearchTypeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (searchType !== e.currentTarget.value)
      setSearchType(e.currentTarget.value as any);
  };

  return <>
    <Header.Placeholder />
    <div className={$["body"]}>

      <div className={$["search-input-container"]}>
        <div className={$["search-input"]}>
          <MaterialSymbol className={$["search-input__icon"]} name="search" inheritedSize />
          <input type="text" className={$["search-input__input"]} placeholder="제목, 글쓴이 ..." />
        </div>
        <div className={$["search-type-container"]}>
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
        </div>
      </div>

      <div className={$["body-sub"]}>
        <p>
          검색어를 입력하세요!
        </p>
      </div>

    </div>
    <Header title="책 검색" />
  </>;
}
