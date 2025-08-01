import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import s from "./ArticlesItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/user/operations";
import { selectUserInfo } from "../../redux/user/selectors";

const ArticlesItem = ({ ownerId, _id, title, article, img }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo(ownerId));
  }, [dispatch]);

  const user = useSelector((state) => selectUserInfo(state, ownerId));

  return (
    <li className={s.item}>
      <div className={s.img_box}>
        {img && <img src={img} alt={title} className={s.img_real} />}
      </div>
      <div className={s.article_content}>
        <p className={s.article_author}>{user ? user.name : "Anonymous"}</p>
        <h3 className={s.article_title}>{title}</h3>
        <p className={s.article_description}>{article}</p>
      </div>
      <div className={s.box_link}>
        <Link to={`/articles/${_id}`} className={s.learn_more_link}>
          Learn more
        </Link>
        <ButtonAddToBookmarks />
      </div>
    </li>
  );
};

export default ArticlesItem;
