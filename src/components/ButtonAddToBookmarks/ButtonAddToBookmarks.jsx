import React from "react";
import s from "./ButtonAddToBookmarks.module.css";
import bookmark from "../../assets/img/sprite.svg";

const ButtonAddToBookmarks = () => {
  return (
    <button type="button" className={s.btn}>
      {/* <svg className={s.icon} width="24" height="24">
        <use href={`${bookmark}#icon-bookmark-alternative`} />
      </svg> */}
      <svg className={s.icon} width="24" height="24">
        <use href={`${bookmark}#icon-bookmark`} />
      </svg>
    </button>
  );
};

export default ButtonAddToBookmarks;
