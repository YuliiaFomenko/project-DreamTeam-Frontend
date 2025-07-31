import React, { useState } from 'react';
import css from './RemoveFromBookmarks.module.css';

const RemoveFromBookmarks = ({ articleId, onRemove, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Remove from localStorage
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const updatedBookmarks = savedBookmarks.filter(id => id !== articleId);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      
      // Call parent callback to update UI
      if (onRemove) {
        onRemove(articleId);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${css.removeBtn} ${className} ${isLoading ? css.loading : ''}`}
      onClick={handleRemove}
      disabled={isLoading}
      aria-label="Remove from bookmarks"
      title="Remove from bookmarks"
    >
      {isLoading ? (
        <div className={css.spinner}></div>
      ) : (
        <svg width="16" height="16" viewBox="0 0 32 32">
          <use href="/src/assets/img/sprite.svg#icon-delete"></use>
        </svg>
      )}
    </button>
  );
};

export default RemoveFromBookmarks;