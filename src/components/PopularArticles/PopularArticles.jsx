import { Link } from "react-router-dom";
import sprite from "../../assets/img/sprite.svg";
import s from "./PopularArticles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPopularArticles } from "../../redux/articles/selectors";
import { useEffect } from "react";
import { fetchPopular } from "../../redux/articles/operations";
import ArticlesItem from "../ArticlesItem/ArticlesItem";

const PopularArticles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);
  const articles = useSelector(selectPopularArticles);

  return (
    <div className={s.popularArticles} id="popular-articles">
      <div className="container">
        <div className={s.top}>
          <h2 className={s.title}>Popular Articles</h2>
          <Link className={s.link} to="/articles">
            Go to all Articles
            <svg width="32" height="32" stroke="var(--green-darker)">
              <use href={`${sprite}#icon-arrows-up`} />
            </svg>
          </Link>
        </div>
        <ul className={s.grid}>
          {articles.slice(0, 4).map((article) => (
            <ArticlesItem key={article._id} {...article} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularArticles;
