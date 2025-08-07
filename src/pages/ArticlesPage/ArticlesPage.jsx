import { useEffect, useRef, useState } from "react";
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
import clsx from "clsx";
import { BarLoader } from "react-spinners";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const override = {
    display: "block",
    margin: "40px auto",
  };
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  // This prevents dispatching same filter/page combos multiple times

  const articles = useSelector(selectAllArticles);
  const articlesPagesInfo = useSelector(selectArticlesPagination);
  const popular = useSelector(selectPopularArticles);
  const popularPagesInfo = useSelector(selectPopularArticlesPagination);
  const isLoading = useSelector(selectArticlesIsLoading);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setHits([]);
    setPage(1);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const action = filter === "All" ? fetchArticles(page) : fetchPopular(page);
    const fetch = async () => {
      await dispatch(action).unwrap();
    };
    fetch();
    setIsLoad(false);
  }, [dispatch, page, filter]);

  useEffect(() => {
    const incoming = filter === "All" ? articles : popular;
    if (!incoming) return;

    setHits((prev) => {
      if (page === 1) return incoming;

      // фільтруємо дублі
      const prevIds = new Set(prev.map((item) => item._id));
      const newItems = incoming.filter((item) => !prevIds.has(item._id));
      return [...prev, ...newItems];
    });
  }, [articles, popular, page, filter]);

  const hasMorePages =
    filter === "All"
      ? articlesPagesInfo?.hasNextPage
      : popularPagesInfo?.hasNextPage;
  return (
    <div className={clsx("container", s.articlesContainer)}>
      <h1 className={s.articles}>Articles</h1>
      <div className={s.articles_box}>
        <p className={s.totalArticles}>
          {filter === "All"
            ? articlesPagesInfo.totalItems
            : popularPagesInfo.totalItems}{" "}
          articles
        </p>
        <CustomSelect value={filter} onChange={handleFilterChange} />
      </div>
      {!isLoad && <ArticlesList filteredArticles={hits} />}
      {isLoading ? (
        <BarLoader cssOverride={override} color={"#374f42"} />
      ) : (
        hasMorePages && <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
export default ArticlesPage;
