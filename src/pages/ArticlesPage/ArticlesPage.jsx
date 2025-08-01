import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import s from "./ArticlesPage.module.css";
import { fetchArticles, fetchPopular } from "../../redux/articles/operations";
import {
  selectAllArticles,
  selectPopularArticles,
  selectTotalArticles,
} from "../../redux/articles/selectors";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("popular");

  const articles = useSelector(selectAllArticles);
  const popularArticles = useSelector(selectPopularArticles);
  const totalArticles = useSelector(selectTotalArticles);
  console.log(articles);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchPopular());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className={s.articles}>Articles</h1>
      <div className={s.articles_box}>
        <p className={s.totalArticles}>{totalArticles} articles</p>
        <CustomSelect value={filter} onChange={setFilter} />
      </div>
      <ArticlesList
        filteredArticles={filter === "popular" ? popularArticles : articles}
      />
      <LoadMoreBtn />
    </div>
  );
};

export default ArticlesPage;
