import Header from "@/components/common/header.new";
import SubSection from "@/components/common/subsection";

import $ from "./shelf.module.css";

export default function MyShelfPage() {
  return (
    <>
      <Header title="내 책장" transparent largeTitle />

      <div className={$["body"]}>

        <div className={$["__menu-board-container"]}>
          <div className={$["__menu-board"]}>
            <div className={$["__menu-board__what"]}>지금 읽고 있는 책</div>
            <div className={$["__menu-board__value"]}>{12}</div>
          </div>
          <div className={$["__menu-board"]}>
            <div className={$["__menu-board__what"]}>구독한 서점 · 도서관</div>
            <div className={$["__menu-board__value"]}>{6}</div>
          </div>
        </div>

        <SubSection title="최근 추가한 책">
          <div>
            {Array.from({ length: 10 }).map(() => (
              <p>안녕하세요</p>
            ))}
          </div>
        </SubSection>
        <SubSection title="구독 서점 · 도서관">
          <div>
            {Array.from({ length: 100 }).map(() => (
              <p>안녕하세요</p>
            ))}
          </div>
        </SubSection>

      </div>
    </>
  );
}
