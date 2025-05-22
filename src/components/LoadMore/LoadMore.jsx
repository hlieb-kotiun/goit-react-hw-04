import s from "./LoadMore.module.css";

const LoadMore = ({ handleLoadMore }) => {
  return (
    <button className={s.btn} onClick={handleLoadMore}>
      Load more
    </button>
  );
};
export default LoadMore;
