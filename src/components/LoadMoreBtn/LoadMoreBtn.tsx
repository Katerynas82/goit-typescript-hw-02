import style from "../LoadMoreBtn/LoadMoreBtn.module.css";

type LoadMoreBtnProps ={
handleChangePage:()=>void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleChangePage }) => {
  return (
    <div className={style.loadMoreContainer}>
      <button className={style.button} onClick={handleChangePage}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
