import $ from "./loading.module.css";

export default function SearchingFallback() {
  return (
    <div className={$["root"]}>
      <div className={$["root__inner"]}>
        <p>찾고 있어요!</p>
      </div>
    </div>
  );
}