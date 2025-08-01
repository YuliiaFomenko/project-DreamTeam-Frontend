import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ nextPage }) => {

    return (
        <button onClick={nextPage} className={css.loadMore}>Load more</button>
    )
};
export default LoadMoreBtn;