import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../redux/auth/selectors';
import css from './ButtonAddToBookmarks.module.css';

const ButtonAddToBookmarks = ({ articleId, className = '' }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    // Check if article is already bookmarked
    if (isLoggedIn) {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(savedBookmarks.includes(articleId));
    }
  }, [articleId, isLoggedIn]);

  const handleToggleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      // Show login modal or redirect to login
      alert('Please log in to bookmark articles');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      if (isBookmarked) {
        // Remove from bookmarks
        const updatedBookmarks = savedBookmarks.filter(id => id !== articleId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        // Add to bookmarks
        const updatedBookmarks = [...savedBookmarks, articleId];
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${css.bookmarkBtn} ${className} ${isBookmarked ? css.bookmarked : ''} ${isLoading ? css.loading : ''}`}
      onClick={handleToggleBookmark}
      disabled={isLoading}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {isLoading ? (
        <div className={css.spinner}></div>
      ) : (
        <svg width="16" height="16" viewBox="0 0 32 32">
          <use href="/src/assets/img/sprite.svg#icon-bookmark-alternative"></use>
        </svg>
      )}
    </button>
  );
};

export default ButtonAddToBookmarks;