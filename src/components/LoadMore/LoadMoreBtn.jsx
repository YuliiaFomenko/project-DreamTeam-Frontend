import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ nextPage }) => {

    return (
        <div onClick={nextPage} className={css.loadMore}>Load more</div>
    )
};
export default LoadMoreBtn;