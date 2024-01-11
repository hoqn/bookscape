import Header from "@/components/common/header";
import $ from "./search.module.css"
import MaterialSymbol from "@/components/ui/material-symbol";

export default function SearchPage() {
  return <>
    <Header.Placeholder />
    <div className={$["body"]}>

      <div className={$["search-input-container"]}>
        <div className={$["search-input"]}>
          <MaterialSymbol className={$["search-input__icon"]} name="search" inheritedSize />
          <input type="text" className={$["search-input__input"]} placeholder="제목, 글쓴이 ..." />  
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
