import React from "react";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ users, filteredArticles }) => {
  return (
    <div>
      <ul className={s.articlesList}>
        {filteredArticles.map((item) => {
          const ownerId = item.ownerId?.$oid;
          const user = users.find((u) => u._id?.$oid === ownerId);

          return (
            <ArticlesItem
              key={item._id.$oid}
              {...item}
              authorName={user?.name || "Clark"}
              authorAvatar={user?.avatarUrl || null}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ArticlesList;
