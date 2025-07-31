import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticleById } from '../../redux/articles/operations';
import { fetchUserInfo } from '../../redux/user/operations';
import { selectArticleById, selectArticlesIsLoading } from '../../redux/articles/selectors';
import { selectUserInfo, selectUserIsLoading } from '../../redux/user/selectors';

import styles from './ArticlePage.module.css';
import Loader from '../../components/Loader/Loader';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const articleData = useSelector(selectArticleById);
  const isArticleLoading = useSelector(selectArticlesIsLoading);

  const authorResponse = useSelector(selectUserInfo);
  const author = authorResponse?.data;  // Витягуємо саме дані автора
  const isAuthorLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  const article = articleData?.data;

  // Запитуємо автора, коли є ownerId
  useEffect(() => {
    if (article?.ownerId) {
      const userId = typeof article.ownerId === 'object' && article.ownerId.$oid
        ? article.ownerId.$oid
        : article.ownerId;

      dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, article?.ownerId]);

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
    <div className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>

      {!isAuthorLoading && author?.name && (
        <p className={styles.author}>Author: {author.name}</p>
      )}

      {formattedDate && <p className={styles.date}>Date: {formattedDate}</p>}

      {article.img && (
        <img src={article.img} alt={article.title} className={styles.image} />
      )}

      <p className={styles.text}>
        {article.article.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default ArticlePage;


