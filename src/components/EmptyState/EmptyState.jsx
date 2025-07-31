import React from 'react';
import { Link } from 'react-router-dom';
import css from './EmptyState.module.css';

const EmptyState = ({ 
  type = 'savedArticles', 
  title, 
  description, 
  actionText, 
  actionLink 
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'savedArticles':
        return {
          title: 'No saved articles yet',
          description: 'Start exploring articles and save the ones you love to build your personal collection.',
          actionText: 'Browse Articles',
          actionLink: '/articles'
        };
      case 'myArticles':
        return {
          title: 'No articles published yet',
          description: 'Share your thoughts and experiences with the community by creating your first article.',
          actionText: 'Create Article',
          actionLink: '/create'
        };
      default:
        return {
          title: 'Nothing here yet',
          description: 'This section is empty.',
          actionText: 'Go Home',
          actionLink: '/'
        };
    }
  };

  const content = {
    title: title || getDefaultContent().title,
    description: description || getDefaultContent().description,
    actionText: actionText || getDefaultContent().actionText,
    actionLink: actionLink || getDefaultContent().actionLink
  };

  return (
    <div className={css.emptyState}>
      <div className={css.emptyIcon}>
        {type === 'savedArticles' ? (
          <svg width="80" height="80" viewBox="0 0 32 32">
            <use href="/src/assets/img/sprite.svg#icon-bookmark-alternative"></use>
          </svg>
        ) : (
          <svg width="80" height="80" viewBox="0 0 32 32">
            <use href="/src/assets/img/sprite.svg#icon-photo"></use>
          </svg>
        )}
      </div>
      
      <h3 className={css.emptyTitle}>{content.title}</h3>
      <p className={css.emptyDescription}>{content.description}</p>
      
      <Link to={content.actionLink} className={css.emptyAction}>
        {content.actionText}
      </Link>
    </div>
  );
};

export default EmptyState;