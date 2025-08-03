import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ nextPage }) => {

    return (
        <div className={css.load}>
            <button onClick={nextPage} className={css.loadMore}>Load more</button>
        </div>
    )
};
export default LoadMoreBtn;