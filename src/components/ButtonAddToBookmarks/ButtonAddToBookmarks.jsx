import s from "./ButtonAddToBookmarks.module.css";
import sprite from "../../assets/img/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { removeFromSaved, addToSaved } from "../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave.jsx";
import { useState } from "react";

export default function ButtonOfToBookmarks({ articleId, ownerId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // const isLoggedIn = true;
  const user = useSelector(selectUser);
  const bookmarked = user.savedArticlesIDs.includes(articleId);
  // const bookmarked = false; // For testing purposes, assuming the article is not bookmarked
  const ownArticle = user.id === ownerId;
  // const ownArticle = true; // For testing purposes, assuming the user owns the article

  const handleEditClick = () => {
    navigate(`/articles/${articleId}`);
  };
  const handleRemoveBookmarkClick = () => {
    dispatch(removeFromSaved(articleId));
  };
  const handleAddBookmarkClick = () => {
    dispatch(addToSaved(articleId));
  };
  const handleOpenModalClick = () => {
    setShowLoginModal(true);
  };
  return (
    <>
      {!isLoggedIn && (
        <button className={s.bookmark} onClick={handleOpenModalClick}>
          <svg width="24" height="24">
            <use href={`${sprite}#icon-bookmark-alternative`} />
          </svg>
        </button>
      )}
      {isLoggedIn && bookmarked && !ownArticle && (
        <button className={s.bookmarked} onClick={handleRemoveBookmarkClick}>
          <svg width="24" height="24">
            <use href={`${sprite}#icon-bookmark-alternative`} />
          </svg>
        </button>
      )}
      {isLoggedIn && !bookmarked && !ownArticle && (
        <button className={s.bookmark} onClick={handleAddBookmarkClick}>
          <svg width="24" height="24">
            <use href={`${sprite}#icon-bookmark-alternative`} />
          </svg>
        </button>
      )}
      {isLoggedIn && ownArticle && (
        <button className={s.edit} onClick={handleEditClick}>
          <svg width="24" height="24">
            <use href={`${sprite}#icon-bookmark`} />
          </svg>
        </button>
      )}
      {showLoginModal && (
        <ModalErrorSave onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}
