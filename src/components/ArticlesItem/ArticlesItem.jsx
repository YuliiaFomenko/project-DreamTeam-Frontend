import React from "react";
import { Link } from "react-router-dom";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import s from "./ArticlesItem.module.css";

const ArticlesItem = ({ _id, title, article, authorName }) => {
  return (
    <li className={s.item}>
      <div className={s.img}></div>
      <div className={s.article_content}>
        <p className={s.article_author}>{authorName}</p>
        <h3 className={s.article_title}>{title}</h3>
        <p className={s.article_description}>{article}</p>
      </div>
      <div className={s.box_link}>
        <Link to={`/articles/${_id.$oid}`} className={s.learn_more_link}>
          Learn more
        </Link>
        <ButtonAddToBookmarks />
      </div>
    </li>
  );
};

export default ArticlesItem;
