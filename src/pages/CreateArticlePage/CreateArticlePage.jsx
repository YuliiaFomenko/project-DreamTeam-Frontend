import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddArticleForm from '../../components/AddArticleForm/AddArticleForm';
import styles from './CreateArticlePage.module.css'
import Loader from '../../components/Loader/Loader';
import { fetchArticleById } from '../../redux/articles/operations';

const CreateArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!articleId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId))
        .unwrap()
        .then(response => {
        setInitialData(response.data);
        })
        .catch(err => {
          setError('Failed to load article');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [articleId, dispatch]);

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;
  return (
    <div className='container'>
    <div className={styles.container}>
    <h1 className={styles.title}>Create an article</h1>
    <AddArticleForm initialData={initialData} />
    </div>
    </div>
  )
}

export default CreateArticlePage