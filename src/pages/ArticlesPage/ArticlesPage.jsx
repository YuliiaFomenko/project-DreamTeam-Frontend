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
  const lastFetch = useRef({ filter: "", page: 0 });

  const articles = useSelector(selectAllArticles);
  const articlesPagesInfo = useSelector(selectArticlesPagination);
  const popular = useSelector(selectPopularArticles);
  const popularPagesInfo = useSelector(selectPopularArticlesPagination);
  const isLoading = useSelector(selectArticlesIsLoading);

  const handleFilterChange = (newFilter) => {
    setHits([]);
    setPage(1);
    setFilter(newFilter);
  };
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (lastFetch.current.filter === filter && lastFetch.current.page === page)
      return;
    lastFetch.current = { filter, page };
    const action = filter === "All" ? fetchArticles(page) : fetchPopular(page);
    dispatch(action);
  }, [dispatch, page, filter]);

  useEffect(() => {
    const incoming = filter === "All" ? articles : popular;
    if (!incoming || incoming.length === 0) return;

    const hitsIDs = new Set(hits.map((item) => item._id));
    const isDuplicating = incoming.some((item) => hitsIDs.has(item._id));

    // If it's the first page OR all articles are new → replace/append
    if (!isDuplicating) {
      setHits((prev) => {
        return page === 1 ? incoming : [...prev, ...incoming];
      });
    }
  }, [articles, popular, filter]);

  const hasMorePages =
    filter === "All"
      ? articlesPagesInfo.hasNextPage
      : popularPagesInfo.hasNextPage;
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
      <ArticlesList filteredArticles={hits} />
      {isLoading ? (
        <BarLoader cssOverride={override} color={"#374f42"} />
      ) : (
        hasMorePages && <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
export default ArticlesPage;
