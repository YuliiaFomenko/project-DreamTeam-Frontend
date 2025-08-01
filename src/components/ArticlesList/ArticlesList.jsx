import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ filteredArticles }) => {
  return (
    <div>
      <ul className={s.articlesList}>
        {filteredArticles.map((item) => {
          return <ArticlesItem key={item._id} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default ArticlesList;
