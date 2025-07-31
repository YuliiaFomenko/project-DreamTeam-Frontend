import React from 'react';
import { Link } from 'react-router-dom';
import css from './ArticlesItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import RemoveFromBookmarks from '../RemoveFromBookmarks/RemoveFromBookmarks';

const ArticlesItem = ({ article, showSaveDate = false, onRemoveFromSaved }) => {
  const {
    id,
    title,
    excerpt,
    author,
    image,
    savedDate
  } = article;

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/articles/${id}`
      });
    } else {
      // Fallback для браузеров без поддержки Web Share API
      navigator.clipboard.writeText(window.location.origin + `/articles/${id}`);
    }
  };

  return (
    <article className={css.articleCard}>
      <Link to={`/articles/${id}`} className={css.articleLink}>
        <div className={css.articleImage}>
          <img 
            src={image || `/placeholder-${id % 6 + 1}.jpg`} 
            alt={title}
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 
                `linear-gradient(45deg, hsl(${id * 60}deg, 70%, 60%), hsl(${id * 60 + 60}deg, 70%, 70%))`;
            }}
          />
        </div>
        
        <div className={css.articleContent}>
          <div className={css.articleMeta}>
            <div className={css.authorTag}>{author}</div>
            {showSaveDate && savedDate && (
              <div className={css.savedDate}>
                Saved {new Date(savedDate).toLocaleDateString()}
              </div>
            )}
          </div>
          <h3 className={css.articleTitle}>{title}</h3>
          <p className={css.articleExcerpt}>{excerpt}</p>
          
          <div className={css.articleActions}>
            <Link to={`/articles/${id}`} className={css.learnMoreBtn}>
              Learn more
            </Link>
            <div className={css.actionButtons}>
              {showSaveDate ? (
                <RemoveFromBookmarks 
                  articleId={id} 
                  onRemove={onRemoveFromSaved}
                />
              ) : (
                <ButtonAddToBookmarks articleId={id} />
              )}
              <button 
                className={css.shareBtn} 
                onClick={handleShare}
                aria-label="Share article"
              >
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <use href="/src/assets/img/sprite.svg#icon-share-ios-big"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticlesItem;