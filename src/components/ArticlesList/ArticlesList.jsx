import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ filteredArticles }) => {
  return (
    <div>
      <ul className={s.articlesList}>
        {filteredArticles.map((item) => (
          <li key={item._id}>
            <ArticlesItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ArticlesList;
