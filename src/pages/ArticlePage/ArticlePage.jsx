import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  deleteArticle,
  fetchArticleById,
  fetchRandom,
} from "../../redux/articles/operations";
import { addToSaved, fetchUserInfo, removeFromSaved } from "../../redux/user/operations";
import {
  selectArticleById,
  selectArticlesIsLoading,
  selectRandomArticles,
} from "../../redux/articles/selectors";
import {
  selectUserInfo,
} from "../../redux/user/selectors";

import styles from "./ArticlePage.module.css";
import Loader from "../../components/Loader/Loader";
import sprite from "../../assets/img/sprite.svg";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave";
import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock";
import toast from "react-hot-toast";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = useSelector((state) => selectArticleById(state, id));
  const isArticleLoading = useSelector(selectArticlesIsLoading);
  const randomArticles = useSelector(selectRandomArticles);
  const allAuthors = useSelector((state) => state.user.users);
  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const [isModalOpen, setModalOpen] = useState(false);
  useBodyLock(isModalOpen);

  const bookmarked = user.savedArticlesIDs.includes(id);
  const ownerId = article?.ownerId;
  const author = useSelector((state) => selectUserInfo(state, ownerId));

  const ownArticle = user.id === ownerId;

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchRandom());
  }, [dispatch, id]);

  useEffect(() => {
    if (ownerId) {
      dispatch(fetchUserInfo(ownerId));
    }
  }, [dispatch, ownerId]);

 const fetchedAuthorIds = useRef(new Set());

  useEffect(() => {
    randomArticles.forEach(({ ownerId }) => {
      if (
        ownerId &&
        !allAuthors?.[ownerId] &&
        !fetchedAuthorIds.current.has(ownerId)
      ) {

        dispatch(fetchUserInfo(ownerId));
        fetchedAuthorIds.current.add(ownerId);
      }
    });
  }, [randomArticles, allAuthors, dispatch]);

  if (isArticleLoading) return <Loader />;
  if (!article) return <p className={styles.error}>Article not found</p>;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const handleSaveClick = () => {
    if (!isLogged) {
      setModalOpen(true);
      return;
    }

    dispatch(addToSaved(article._id))
      .unwrap()
      .catch((err) => {
        if (err?.includes("401")) {
          setModalOpen(true);
        }
      });
  };

  const handleUnsaveClick = () => {
    if (!isLogged) {
      setModalOpen(true);
      return;
    }

    dispatch(removeFromSaved(article._id))
      .unwrap()
      .catch((err) => {
        if (err?.includes("401")) {
          setModalOpen(true);
        }
      });
  };

  const handleEditClick = () => {
    navigate(`/create/${article._id}`);
  }

const handleDeleteClick = async () => {
  try {
    await dispatch(deleteArticle(article._id)).unwrap();
    toast.success('Article deleted successfully');
    navigate(`/authors/${user.id}`);
  } catch {
    toast.error('Failed to delete the article');
  }
};

  return (
    <div className="container">
      <div className={styles.container}>
        <h2 className={styles.title}>{article.title}</h2>

        {article.img && (
          <img
            src={article.img}
            alt={article.title}
            className={styles.image}
          />
        )}

        <div className={styles.contentWrap}>
          <div className={styles.text}>
            {typeof article.article === "string"
            ? article.article
            .split(/\n|\/n/) 
            .map((paragraph, idx) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))
          : null}
          </div>

          <div>
            <div className={styles.interestedContainer}>
              
                {author?.name && (
                <p className={styles.author}>
                <strong>Author:</strong> <u>{author.name}</u>
                </p>
                )}
              

              {formattedDate && (
                <p className={styles.date}>
                  <strong>Publication date:</strong> {formattedDate}
                </p>
              )}

              <div className={styles.recommendation}>
                <h3 className={styles.recommendationTitle}>
                  You can also interested
                </h3>
                <ul className={styles.recommendationList}>
                  {randomArticles.map((item) => {
                    const authorInfo = allAuthors?.[item.ownerId];
                    return (
                      <li key={item._id} className={styles.recommendationItem}>
                        <span className={styles.recommendationItemText}>
                          {item.title}
                          {authorInfo?.name && (
                            <div className={styles.recommendationItemAuthor}>
                              {authorInfo.name}
                            </div>
                          )}
                        </span>
                        <button
                          className={styles.btnOpen}
                          onClick={() => navigate(`/articles/${item._id}`)}
                        >
                          <svg className={styles.arrow}>
                            <use href={`${sprite}#icon-arrows-right`} />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

           {!ownArticle && !bookmarked && (
  <button
    className={styles.buttonSave}
    onClick={handleSaveClick}
  >Save
    <svg className={styles.icon}>
      <use href={`${sprite}#icon-bookmark-alternative`} />
    </svg>
  </button>
)}
{!ownArticle && bookmarked && (
  <button
    className={styles.buttonSave}
    onClick={handleUnsaveClick}
  >Unsave
    <svg className={styles.icon}>
      <use href={`${sprite}#icon-bookmark-alternative`} />
    </svg>
  </button>
)}
{ownArticle && (<div className={styles.buttons}> <button
    className={styles.buttonEdit}
    onClick={handleEditClick}
  >
    Edit
    <svg className={styles.icon}>
      <use href={`${sprite}#icon-bookmark`} />
    </svg>
  </button>
  <button
    className={styles.buttonDelete}
    onClick={handleDeleteClick}
  >Delete
  </button></div>
 
)}
            
          </div>
        </div>
      </div>
      <ModalErrorSave
        onClose={() => setModalOpen(false)}
        isOpen={isModalOpen}
      />
    </div>
  );
};

export default ArticlePage;
