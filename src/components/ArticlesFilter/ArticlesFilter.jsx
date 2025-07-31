import React from 'react';
import css from './ArticlesFilter.module.css';

const ArticlesFilter = ({ 
  sortBy, 
  onSortChange, 
  filterBy, 
  onFilterChange, 
  categories = [],
  showSearch = false,
  searchQuery = '',
  onSearchChange
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' }
  ];

  return (
    <div className={css.filterContainer}>
      {showSearch && (
        <div className={css.searchWrapper}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={css.searchInput}
          />
          <svg className={css.searchIcon} width="20" height="20" viewBox="0 0 32 32">
            <use href="/src/assets/img/sprite.svg#icon-search"></use>
          </svg>
        </div>
      )}
      
      <div className={css.filtersRow}>
        <div className={css.filterGroup}>
          <label htmlFor="sort" className={css.filterLabel}>Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={css.filterSelect}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div className={css.filterGroup}>
            <label htmlFor="category" className={css.filterLabel}>Category:</label>
            <select
              id="category"
              value={filterBy}
              onChange={(e) => onFilterChange(e.target.value)}
              className={css.filterSelect}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesFilter;