import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticleById } from '../../redux/articles/operations';
import { fetchUserInfo } from '../../redux/user/operations';
import { selectArticleById, selectArticlesIsLoading } from '../../redux/articles/selectors';
import { selectUserInfo, selectUserIsLoading } from '../../redux/user/selectors';

import styles from './ArticlePage.module.css';
import Loader from '../../components/Loader/Loader';
import sprite from '../../assets/img/sprite.svg';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const articleData = useSelector(state => selectArticleById(state, id));
  const isArticleLoading = useSelector(selectArticlesIsLoading);

  const article = articleData;

  const userId =
    typeof article?.ownerId === 'object' && article.ownerId?.$oid
      ? article.ownerId.$oid
      : article?.ownerId;

  const authorResponse = useSelector(state => selectUserInfo(state, userId));
  const author = authorResponse?.data || authorResponse;
  const isAuthorLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, userId]);

  if (isArticleLoading) return <Loader />;
  if (!article) return <p className={styles.error}>Article not found</p>;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <div className="container">
      <div className={styles.container}>
        <h2 className={styles.title}>{article.title}</h2>

        {article.img && (
          <img src={article.img} alt={article.title} className={styles.image} />
        )}

        <div className={styles.contentWrap}>
          <div className={styles.text}>
            {article.article
              .split('/n')
              .map((paragraph, idx) => <p key={idx}>{paragraph.trim()}</p>)}
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
                <h3 className={styles.recommendationTitle}>You can also interested</h3>
                <ul className={styles.recommendationList}>
                  <li className={styles.recommendationItem}>
                    First link
                    <button className={styles.btnOpen}>
                      <svg className={styles.arrow}>
                        <use href={`${sprite}#icon-arrows-right`} />
                      </svg>
                    </button>
                  </li>
                  <li className={styles.recommendationItem}>
                    Second link
                    <button className={styles.btnOpen}>
                      <svg className={styles.arrow}>
                        <use href={`${sprite}#icon-arrows-right`} />
                      </svg>
                    </button>
                  </li>
                  <li className={styles.recommendationItem}>
                    Third link
                    <button className={styles.btnOpen}>
                      <svg className={styles.arrow}>
                        <use href={`${sprite}#icon-arrows-right`} />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <button className={styles.buttonSave}>
              Save
              <svg className={styles.icon}>
                <use href={`${sprite}#icon-bookmark-alternative`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;


