import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ filteredArticles, isPublic }) => {
  return (
    <div>
      <ul className={s.articlesList}>
        {filteredArticles.map((item) => {
          return <ArticlesItem isPublic={isPublic} key={item._id} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default ArticlesList;
