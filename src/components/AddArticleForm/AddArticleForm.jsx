import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { createArticle, updateArticle } from '../../redux/articles/operations';
import styles from './AddArticleForm.module.css';
import sprite from '../../assets/img/sprite.svg';

const MAX_FILE_SIZE = 1024 * 1024;

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(48, 'Title must be at most 48 characters')
    .required('Title is required'),

  article: Yup.string()
    .min(100, 'Article must be at least 100 characters')
    .max(4000, 'Article must be at most 4000 characters')
    .required('Article is required'),

  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'Image must be less than 1MB', value => {
      return value && value.size <= MAX_FILE_SIZE;
    }),
});

const AddArticleForm = ({ initialData = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = Boolean(initialData);

  const initialValues = {
    title: initialData?.title || '',
    article: initialData?.article || '',
    image: initialData?.image || null,
  };

  const handleSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('article', values.article);

      if (isEdit) {
        if (values.image && typeof values.image !== 'string') {
          formData.append('image', values.image);
        }

        const result = await dispatch(
          updateArticle({ articleId: initialData._id, formData })
        ).unwrap();

        toast.success('Article successfully updated');
        navigate(`/articles/${result._id}`);
      } else {
        formData.append('image', values.image);
        formData.append('date', new Date().toISOString());

        const result = await dispatch(createArticle(formData)).unwrap();

        toast.success('Article successfully created');
        actions.resetForm();
        navigate(`/articles/${result._id}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <section className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ setFieldValue, isSubmitting, values, touched, errors }) => (
          <Form className={styles.form}>
            <div className={styles.inputTitle}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter the title"
                className={styles.input}
              />
              {touched.title && errors.title && (
                <div className={styles.error}>{errors.title}</div>
              )}
            </div>

            <div className={styles.textareaText}>
              <label htmlFor="article" className={styles.label} hidden>Article</label>
              <Field name="article">
                {({ field }) => (
                  <textarea
                    {...field}
                    id="article"
                    placeholder="Enter article text"
                    className={styles.textarea}
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                )}
              </Field>
              {touched.article && errors.article && (
                <div className={styles.error}>{errors.article}</div>
              )}
            </div>

            <div className={styles.imageUpload}>
              <label htmlFor="image" className={styles.imageLabel}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue('image', file);
                  }}
                />
                <div className={styles.imagePreview}>
                  {values.image ? (
                    <img
                      src={
                        typeof values.image === 'string'
                          ? values.image
                          : URL.createObjectURL(values.image)
                      }
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <svg className={styles.icon}>
                      <use href={`${sprite}#icon-photo`} />
                    </svg>
                  )}
                </div>
              </label>
              {touched.image && errors.image && (
                <div className={styles.error}>{errors.image}</div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isEdit ? 'Publish' : 'Publish Article'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddArticleForm;




