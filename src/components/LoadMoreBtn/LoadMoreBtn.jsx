import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <div>
      <button className={s.btn} onClick={handleClick} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
