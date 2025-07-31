import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './AuthorProfilePage.module.css';
import ArticlesItem from '../../components/ArticlesItem/ArticlesItem';
import Pagination from '../../components/Pagination/Pagination';
import ArticlesFilter from '../../components/ArticlesFilter/ArticlesFilter';

const AuthorProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('myArticles');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [authorData, setAuthorData] = useState({
    name: 'Naomi',
    articlesCount: 96,
    avatar: '/default-avatar.jpg'
  });

  // Mock data for saved articles (articles saved by other authors)
  const mockSavedArticles = [
    {
      id: 101,
      title: 'Digital Detox: Reclaiming Your Mental Space',
      excerpt: 'How to create healthy boundaries with technology for better mental wellbeing',
      author: 'Sarah Johnson',
      image: '/saved1.jpg',
      category: 'Digital Wellness',
      savedDate: '2024-01-15'
    },
    {
      id: 102,
      title: 'The Art of Slow Living',
      excerpt: 'Embracing a slower pace of life to reduce stress and increase mindfulness',
      author: 'Michael Chen',
      image: '/saved2.jpg',
      category: 'Lifestyle',
      savedDate: '2024-01-10'
    },
    {
      id: 103,
      title: 'Building Resilience Through Gratitude',
      excerpt: 'Scientific approaches to developing a grateful mindset for better mental health',
      author: 'Emma Davis',
      image: '/saved3.jpg',
      category: 'Psychology',
      savedDate: '2024-01-08'
    },
    {
      id: 104,
      title: 'Sleep Hygiene for Mental Clarity',
      excerpt: 'Creating the perfect sleep environment for optimal cognitive function',
      author: 'Dr. James Wilson',
      image: '/saved4.jpg',
      category: 'Health',
      savedDate: '2024-01-05'
    },
    {
      id: 105,
      title: 'Mindful Eating: Nourishing Body and Soul',
      excerpt: 'The connection between conscious eating and emotional wellbeing',
      author: 'Lisa Rodriguez',
      image: '/saved5.jpg',
      category: 'Nutrition',
      savedDate: '2024-01-03'
    },
    {
      id: 106,
      title: 'Creating Sacred Spaces at Home',
      excerpt: 'Designing environments that promote peace and tranquility',
      author: 'David Kim',
      image: '/saved6.jpg',
      category: 'Home & Lifestyle',
      savedDate: '2024-01-01'
    }
  ];
  const mockArticles = [
    {
      id: 1,
      title: 'When Anxiety Feels Like a Room With No Doors',
      excerpt: '10 advices how meditations can help you feeling better',
      author: 'Clark',
      image: '/article1.jpg',
      category: 'Mental Health'
    },
    {
      id: 2,
      title: 'The Quiet Power of Doing Nothing',
      excerpt: 'In a culture obsessed with productivity, embracing rest can be an act of resistance - and...',
      author: 'Debby',
      image: '/article2.jpg',
      category: 'Lifestyle'
    },
    {
      id: 3,
      title: 'Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm',
      excerpt: 'Simple, science-backed practices that can gently shift your mood and focus before the day begins',
      author: 'Max',
      image: '/article3.jpg',
      category: 'Wellness'
    },
    {
      id: 4,
      title: 'The Quiet Power of Doing Nothing',
      excerpt: 'In a culture obsessed with productivity, embracing rest can be an act of resistance - and...',
      author: 'Debby',
      image: '/article4.jpg',
      category: 'Mental Health'
    },
    {
      id: 5,
      title: 'When Anxiety Feels Like a Room With No Doors',
      excerpt: '10 advices how meditations can help you feeling better',
      author: 'Clark',
      image: '/article5.jpg',
      category: 'Psychology'
    },
    {
      id: 6,
      title: 'Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm',
      excerpt: 'Simple, science-backed practices that can gently shift your mood and focus before the day begins',
      author: 'Max',
      image: '/article6.jpg',
      category: 'Wellness'
    }
  ];

  useEffect(() => {
    // Here you would fetch author data and articles from API
    setArticles(mockArticles);
    setSavedArticles(mockSavedArticles);
  }, [id]);

  useEffect(() => {
    // Reset page when switching tabs
    setCurrentPage(1);
  }, [activeTab]);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Add more articles to the list
    setTimeout(() => {
      if (activeTab === 'myArticles') {
        const moreArticles = [
          {
            id: articles.length + 1,
            title: 'Finding Peace in Chaos',
            excerpt: 'Practical strategies for maintaining calm in stressful situations',
            author: 'Naomi',
            image: '/article7.jpg',
            category: 'Stress Management'
          }
        ];
        setArticles(prev => [...prev, ...moreArticles]);
      } else {
        const moreSavedArticles = [
          {
            id: savedArticles.length + 101,
            title: 'The Power of Deep Breathing',
            excerpt: 'Simple breathing techniques for instant stress relief',
            author: 'Dr. Amanda Foster',
            image: '/saved7.jpg',
            category: 'Wellness',
            savedDate: '2023-12-28'
          }
        ];
        setSavedArticles(prev => [...prev, ...moreSavedArticles]);
      }
      setIsLoading(false);
    }, 500);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Here you would fetch new articles for the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setFilterBy('');
    setSortBy('newest');
  };

  // Get filtered and sorted articles
  const getFilteredAndSortedArticles = () => {
    let currentArticles = activeTab === 'myArticles' ? articles : savedArticles;
    
    // Apply search filter
    if (searchQuery) {
      currentArticles = currentArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterBy) {
      currentArticles = currentArticles.filter(article =>
        article.category === filterBy
      );
    }
    
    // Apply sorting
    currentArticles = [...currentArticles].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.savedDate || '2024-01-01') - new Date(b.savedDate || '2024-01-01');
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'newest':
        default:
          return new Date(b.savedDate || '2024-01-01') - new Date(a.savedDate || '2024-01-01');
      }
    });
    
    return currentArticles;
  };

  // Get unique categories for filter
  const getCategories = () => {
    const currentArticles = activeTab === 'myArticles' ? articles : savedArticles;
    const categories = [...new Set(currentArticles.map(article => article.category))];
    return categories.sort();
  };

  const handleRemoveFromSaved = (articleId) => {
    setSavedArticles(prev => prev.filter(article => article.id !== articleId));
  };

  return (
    <div className={css.container}>
      <div className={css.profileHeader}>
        <div className={css.profilePic}>
          <img src={authorData.avatar} alt={authorData.name} />
        </div>
        <div className={css.profileInfo}>
          <h1 className={css.authorName}>{authorData.name}</h1>
          <p className={css.articlesCount}>{authorData.articlesCount} articles</p>
        </div>
      </div>

      <div className={css.tabs}>
        <button 
          className={`${css.tab} ${activeTab === 'myArticles' ? css.active : ''}`}
          onClick={() => handleTabChange('myArticles')}
        >
          My Articles
          <span className={css.tabCounter}>({articles.length})</span>
        </button>
        <button 
          className={`${css.tab} ${activeTab === 'savedArticles' ? css.active : ''}`}
          onClick={() => handleTabChange('savedArticles')}
        >
          Saved Articles
          <span className={css.tabCounter}>({savedArticles.length})</span>
        </button>
      </div>

      {(articles.length > 0 || savedArticles.length > 0) && (
        <ArticlesFilter
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          categories={getCategories()}
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {getFilteredAndSortedArticles().length > 0 ? (
        <>
          <div className={css.articlesGrid}>
            {getFilteredAndSortedArticles().map(article => (
              <ArticlesItem 
                key={article.id} 
                article={article} 
                showSaveDate={activeTab === 'savedArticles'}
                onRemoveFromSaved={activeTab === 'savedArticles' ? handleRemoveFromSaved : undefined}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <div className={css.loadMore}>
            <button 
              className={css.loadMoreBtn} 
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      ) : (
        <EmptyState 
          type={activeTab === 'myArticles' ? 'myArticles' : 'savedArticles'}
        />
      )}
    </div>
  );
};

export default AuthorProfilePage;