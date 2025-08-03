import s from "./ButtonAddToBookmarks.module.css";
import sprite from "../../assets/img/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { removeFromSaved, addToSaved } from "../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave.jsx";
import { useState } from "react";
import { refreshThunk } from "../../redux/auth/operations.js";
import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock.js";

export default function ButtonOfToBookmarks({ articleId, ownerId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);
  const bookmarked = user.savedArticlesIDs.includes(articleId);
  const ownArticle = user.id === ownerId;

  const handleEditClick = () => {
    navigate(`/create/${articleId}`);
  };

  const handleAddBookmarkClick = async () => {
    await dispatch(refreshThunk());
    dispatch(addToSaved(articleId));
  };

  const handleRemoveBookmarkClick = async () => {
    await dispatch(refreshThunk());
    dispatch(removeFromSaved(articleId));
  };

  const handleOpenModalClick = () => {
    setShowLoginModal(true);
  };
  useBodyLock(showLoginModal);

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
      <ModalErrorSave
        onClose={() => setShowLoginModal(false)}
        isOpen={showLoginModal}
      />
    </>
  );
}
