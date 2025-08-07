import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ filteredArticles }) => {
  return (
    <div>
      <ul className={s.articlesList}>
        {filteredArticles.length > 0 &&
          filteredArticles.map((item, index) => (
            <li key={item._id || index}>
              <ArticlesItem {...item} />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default ArticlesList;
