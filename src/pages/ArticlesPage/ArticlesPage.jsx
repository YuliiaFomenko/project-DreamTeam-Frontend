import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import s from "./ArticlesPage.module.css";
import { fetchArticles, fetchPopular } from "../../redux/articles/operations";
import {
  selectAllArticles,
  selectArticlesPagination,
  selectPopularArticles,
} from "../../redux/articles/selectors";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { logOutThunk } from "../../redux/auth/operations";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const articles = useSelector(selectAllArticles);
  const popularArticles = useSelector(selectPopularArticles);

  const articlesP = useSelector(selectArticlesPagination);

  console.log(articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
    dispatch(fetchPopular());
  }, [dispatch, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="container">
      <h1 className={s.articles}>Articles</h1>
      <button
        onClick={() => {
          dispatch(logOutThunk());
        }}
      >
        logOut
      </button>
      <div className={s.articles_box}>
        <p className={s.totalArticles}>{articlesP.totalItems} articles</p>
        <CustomSelect value={filter} onChange={setFilter} />
      </div>
      <ArticlesList
        filteredArticles={filter === "Popular" ? popularArticles : articles}
      />
      <LoadMoreBtn handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default ArticlesPage;
