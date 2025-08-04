import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchArticleById, fetchRandom } from "../../redux/articles/operations";
import { addToSaved, fetchUserInfo } from "../../redux/user/operations";
import {
  selectArticleById,
  selectArticlesIsLoading,
  selectRandomArticles,
} from "../../redux/articles/selectors";
import {
  selectUserInfo,
  selectUserIsLoading,
} from "../../redux/user/selectors";

import styles from "./ArticlePage.module.css";
import Loader from "../../components/Loader/Loader";
import sprite from "../../assets/img/sprite.svg";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave";
import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = useSelector((state) => selectArticleById(state, id));
  const isArticleLoading = useSelector(selectArticlesIsLoading);

  const userId =
    typeof article?.ownerId === "object" && article.ownerId?.$oid
      ? article.ownerId.$oid
      : article?.ownerId;

  const author = useSelector((state) => selectUserInfo(state, userId));
  const isAuthorLoading = useSelector(selectUserIsLoading);

  const randomArticles = useSelector(selectRandomArticles);
  const allAuthors = useSelector((state) => state.user.users);

  const [isModalOpen, setModalOpen] = useState(false);
  useBodyLock(isModalOpen);
  const isLogged = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchRandom());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (randomArticles.length > 0) {
      randomArticles.forEach((articleItem) => {
        const ownerId =
          typeof articleItem?.ownerId === "object" && articleItem.ownerId?.$oid
            ? articleItem.ownerId.$oid
            : articleItem?.ownerId;
        if (ownerId && !allAuthors?.[ownerId]) {
          dispatch(fetchUserInfo(ownerId));
        }
      });
    }
  }, [randomArticles, dispatch, allAuthors]);

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

  return (
    <div className="container">
      <div className={styles.container}>
        <h2 className={styles.title}>{article.title}</h2>

        {article.img && (
          <img src={article.img} alt={article.title} className={styles.image} />
        )}

        <div className={styles.contentWrap}>
          <div className={styles.text}>
            {typeof article.article === 'string'
  ? article.article
      .split('/n')
      .map((paragraph, idx) => <p key={idx}>{paragraph.trim()}</p>)
  : null}
          </div>

          <div>
            <div className={styles.interestedContainer}>
              {!isAuthorLoading && author?.name && (
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
                    const itemUserId =
                      typeof item?.ownerId === "object" && item.ownerId?.$oid
                        ? item.ownerId.$oid
                        : item.ownerId;

                    const authorInfo = allAuthors?.[itemUserId];

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

            <button className={styles.buttonSave} onClick={handleSaveClick}>
              Save
              <svg className={styles.icon}>
                <use href={`${sprite}#icon-bookmark-alternative`} />
              </svg>
            </button>
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
