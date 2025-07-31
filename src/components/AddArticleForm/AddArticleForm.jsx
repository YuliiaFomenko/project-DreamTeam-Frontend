import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './AddArticleForm.module.css';

const AddArticleForm = ({ onClose, onSubmit }) => {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Mental Health',
    'Wellness',
    'Lifestyle',
    'Psychology',
    'Digital Wellness',
    'Nutrition',
    'Exercise',
    'Mindfulness',
    'Stress Management',
    'Sleep',
    'Relationships',
    'Work-Life Balance'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 20) {
      newErrors.excerpt = 'Excerpt must be at least 20 characters';
    } else if (formData.excerpt.length > 200) {
      newErrors.excerpt = 'Excerpt must be less than 200 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 100) {
      newErrors.content = 'Content must be at least 100 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const articleData = {
        ...formData,
        author: user?.name || 'Anonymous',
        createdAt: new Date().toISOString(),
        id: Date.now() // Temporary ID generation
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        onSubmit(articleData);
      }
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setErrors({ submit: 'Failed to create article. Please try again.' });
      console.error('Article creation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.header}>
          <h2 className={css.title}>Create New Article</h2>
          <p className={css.subtitle}>Share your thoughts with the Harmoniq community</p>
        </div>

        {errors.submit && (
          <div className={css.errorMessage}>
            {errors.submit}
          </div>
        )}

        <div className={css.inputGroup}>
          <label htmlFor="title" className={css.label}>
            Article Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`${css.input} ${errors.title ? css.inputError : ''}`}
            placeholder="Enter an engaging title for your article"
            disabled={isLoading}
            maxLength={100}
          />
          <div className={css.charCount}>
            {formData.title.length}/100
          </div>
          {errors.title && (
            <span className={css.fieldError}>{errors.title}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="category" className={css.label}>
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${css.select} ${errors.category ? css.inputError : ''}`}
            disabled={isLoading}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className={css.fieldError}>{errors.category}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="excerpt" className={css.label}>
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className={`${css.textarea} ${errors.excerpt ? css.inputError : ''}`}
            placeholder="Write a brief summary of your article (this will appear in previews)"
            disabled={isLoading}
            rows={3}
            maxLength={200}
          />
          <div className={css.charCount}>
            {formData.excerpt.length}/200
          </div>
          {errors.excerpt && (
            <span className={css.fieldError}>{errors.excerpt}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="image" className={css.label}>
            Featured Image
          </label>
          <div className={css.imageUpload}>
            {imagePreview ? (
              <div className={css.imagePreview}>
                <img src={imagePreview} alt="Preview" className={css.previewImage} />
                <button
                  type="button"
                  onClick={removeImage}
                  className={css.removeImageBtn}
                  disabled={isLoading}
                >
                  <svg width="16" height="16" viewBox="0 0 32 32">
                    <use href="/src/assets/img/sprite.svg#icon-close"></use>
                  </svg>
                </button>
              </div>
            ) : (
              <label htmlFor="image" className={css.uploadArea}>
                <svg width="48" height="48" viewBox="0 0 32 32">
                  <use href="/src/assets/img/sprite.svg#icon-photo"></use>
                </svg>
                <span>Click to upload image</span>
                <span className={css.uploadHint}>JPG, PNG up to 5MB</span>
              </label>
            )}
            <input
              type="file"
              id="image"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className={css.fileInput}
              disabled={isLoading}
            />
          </div>
          {errors.image && (
            <span className={css.fieldError}>{errors.image}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="content" className={css.label}>
            Article Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`${css.textarea} ${css.contentTextarea} ${errors.content ? css.inputError : ''}`}
            placeholder="Write your article content here. Share your insights, experiences, and knowledge with the community..."
            disabled={isLoading}
            rows={12}
          />
          <div className={css.charCount}>
            {formData.content.length} characters
          </div>
          {errors.content && (
            <span className={css.fieldError}>{errors.content}</span>
          )}
        </div>

        <div className={css.formActions}>
          <button
            type="button"
            className={css.cancelBtn}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={css.spinner}></div>
                Publishing...
              </>
            ) : (
              'Publish Article'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;