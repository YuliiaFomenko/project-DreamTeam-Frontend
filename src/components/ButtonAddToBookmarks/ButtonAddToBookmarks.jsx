import s from "./ButtonAddToBookmarks.module.css";
import sprite from "../../assets/img/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { removeFromSaved, addToSaved } from "../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave.jsx";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock.js";
import Loader from "../Loader/Loader.jsx";

const override = {
  position: "absolute",
  width: "80%",
  height: "80%",
};

export default function ButtonOfToBookmarks({ articleId, ownerId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);
  const bookmarked = user.savedArticlesIDs.includes(articleId);
  const ownArticle = user.id === ownerId;

  const handleEditClick = () => {
    navigate(`/create/${articleId}`);
  };

  const handleAddBookmarkClick = async () => {
    setIsLoading(true);
    await dispatch(addToSaved(articleId)).unwrap();
    setIsLoading(false);
  };

  const handleRemoveBookmarkClick = async () => {
    setIsLoading(true);
    await dispatch(removeFromSaved(articleId)).unwrap();
    setIsLoading(false);
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
          {!isLoading && (
            <svg width="24" height="24">
              <use href={`${sprite}#icon-bookmark-alternative`} />
            </svg>
          )}
          {isLoading && <ClipLoader cssOverride={override} color="#d1e0d8" />}
        </button>
      )}
      {isLoggedIn && !bookmarked && !ownArticle && (
        <button className={s.bookmark} onClick={handleAddBookmarkClick}>
          {!isLoading && (
            <svg width="24" height="24">
              <use href={`${sprite}#icon-bookmark-alternative`} />
            </svg>
          )}
          {isLoading && <ClipLoader cssOverride={override} color="#374f42" />}
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
