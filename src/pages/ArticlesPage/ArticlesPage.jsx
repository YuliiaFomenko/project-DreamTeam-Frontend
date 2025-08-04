import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import s from "./ArticlesPage.module.css";
import { fetchArticles, fetchPopular } from "../../redux/articles/operations";
import {
  selectAllArticles,
  selectArticlesIsLoading,
  selectArticlesPagination,
  selectPopularArticles,
  selectPopularArticlesPagination,
} from "../../redux/articles/selectors";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagePopular, setPagePopular] = useState(1);

  const [localArticles, setLocalArticles] = useState([]);
  const [localPopular, setLocalPopular] = useState([]);

  const articles = useSelector(selectAllArticles);
  const popularArticles = useSelector(selectPopularArticles);

  const articlesP = useSelector(selectArticlesPagination);
  const popularP = useSelector(selectPopularArticlesPagination);

  const isLoadingAll = useSelector(selectArticlesIsLoading);

  useEffect(() => {
    setPage(1);
    setPagePopular(1);
    setLocalArticles([]);
    setLocalPopular([]);
  }, [filter]);

  useEffect(() => {
    if (filter === "All") {
      dispatch(fetchArticles(page));
    }
  }, [dispatch, filter, page]);

  useEffect(() => {
    if (filter === "Popular") {
      dispatch(fetchPopular(pagePopular));
    }
  }, [dispatch, filter, pagePopular]);

  useEffect(() => {
    if (filter === "All" && articles.length > 0) {
      if (page === 1) {
        setLocalArticles(articles);
      } else {
        setLocalArticles((prev) => {
          return [...prev, ...articles];
        });
      }
    }
  }, [articles, page, filter]);

  useEffect(() => {
    if (filter === "Popular" && popularArticles.length > 0) {
      if (pagePopular === 1) {
        setLocalPopular(popularArticles);
      } else {
        setLocalPopular((prev) => {
          return [...prev, ...popularArticles];
        });
      }
    }
  }, [popularArticles, pagePopular, filter]);

  const handleLoadMore = () => {
    if (filter === "All") {
      setPage((prev) => prev + 1);
    } else {
      setPagePopular((prev) => prev + 1);
    }
  };

  const hasNextPage =
    filter === "All" ? articlesP.hasNextPage : popularP.hasNextPage;

  return (
    <div className="container">
      <h1 className={s.articles}>Articles</h1>
      <div className={s.articles_box}>
        <p className={s.totalArticles}>
          {filter === "All" ? articlesP.totalItems : popularP.totalItems}{" "}
          articles
        </p>
        <CustomSelect value={filter} onChange={setFilter} />
      </div>
      <ArticlesList
        filteredArticles={filter === "Popular" ? localPopular : localArticles}
      />
      {!isLoadingAll && hasNextPage && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};

export default ArticlesPage;
