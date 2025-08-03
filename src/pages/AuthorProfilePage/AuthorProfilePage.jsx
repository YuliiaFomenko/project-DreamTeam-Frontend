import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, FileText, User, Settings, LogOut } from 'lucide-react';

const AuthorProfilePage = () => {
  const [activeTab, setActiveTab] = useState('myArticles');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Mock user data - in real app this would come from props or context
  const userData = {
    id: 1,
    name: 'Naomi',
    avatar: '/api/placeholder/100/100',
    bio: 'Passionate writer focused on mental health and personal growth. Sharing stories that inspire and heal.',
    joinDate: 'January 2024',
    articlesCount: articles.length,
    followersCount: 1234,
    followingCount: 567
  };

  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      title: 'Finding Peace in Mindfulness',
      description: 'Discover how daily mindfulness practices can transform your mental well-being and bring lasting peace to your life.',
      image: '/api/placeholder/300/200',
      author: 'Naomi',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      tags: ['Mindfulness', 'Mental Health']
    },
    {
      id: 2,
      title: 'The Journey to Self-Discovery',
      description: 'A personal reflection on the path to understanding ourselves and embracing our authentic selves.',
      image: '/api/placeholder/300/200',
      author: 'Naomi',
      publishDate: '2024-01-10',
      readTime: '8 min read',
      tags: ['Self-Growth', 'Personal Development']
    }
  ];

  const mockSavedArticles = [
    {
      id: 3,
      title: 'Building Resilience in Difficult Times',
      description: 'Learn practical strategies for developing emotional resilience and bouncing back from life\'s challenges.',
      image: '/api/placeholder/300/200',
      author: 'Emma Johnson',
      publishDate: '2024-01-12',
      readTime: '6 min read',
      tags: ['Resilience', 'Coping']
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setArticles(mockArticles);
        setSavedArticles(mockSavedArticles);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateArticle = () => {
    console.log('Redirecting to create article page...');
    // In real app: navigate('/create-article')
  };

  const handleGoToArticles = () => {
    console.log('Redirecting to articles page...');
    // In real app: navigate('/articles')
  };

  const handleEditProfile = () => {
    console.log('Opening edit profile modal...');
    setShowSettings(!showSettings);
  };

  const renderEmptyState = (type) => {
    const config = {
      myArticles: {
        title: 'No articles yet',
        subtitle: 'Share your first story with the community',
        buttonText: 'Create an article',
        action: handleCreateArticle,
        icon: <FileText className="w-12 h-12 text-green-600" />
      },
      savedArticles: {
        title: 'No saved articles',
        subtitle: 'Save articles you want to read later',
        buttonText: 'Explore articles',
        action: handleGoToArticles,
        icon: <Bookmark className="w-12 h-12 text-green-600" />
      }
    };

    const currentConfig = config[type];

    return (
      <div className="bg-green-50 rounded-2xl p-12 text-center max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          {currentConfig.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {currentConfig.title}
        </h3>
        <p className="text-gray-600 mb-6">
          {currentConfig.subtitle}
        </p>
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200"
          onClick={currentConfig.action}
        >
          {currentConfig.buttonText}
        </button>
      </div>
    );
  };

  const renderArticleCard = (article) => {
    return (
      <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {article.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bookmark className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">{userData.bio}</p>
                  <p className="text-sm text-gray-500">Joined {userData.joinDate}</p>
                </div>
                <div className="relative">
                  <button 
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{userData.articlesCount}</div>
                  <div className="text-gray-500">Articles</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{userData.followersCount}</div>
                  <div className="text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{userData.followingCount}</div>
                  <div className="text-gray-500">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Article Button */}
        <div className="mb-8">
          <button 
            onClick={handleCreateArticle}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            Create New Article
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'myArticles' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('myArticles')}
            >
              My Articles ({articles.length})
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'savedArticles' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('savedArticles')}
            >
              Saved Articles ({savedArticles.length})
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'myArticles' && (
              <div>
                {articles.length === 0 ? (
                  renderEmptyState('myArticles')
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(renderArticleCard)}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'savedArticles' && (
              <div>
                {savedArticles.length === 0 ? (
                  renderEmptyState('savedArticles')
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedArticles.map(renderArticleCard)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {((activeTab === 'myArticles' && articles.length > 0) || 
            (activeTab === 'savedArticles' && savedArticles.length > 0)) && (
            <div className="p-8 pt-0 text-center">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-full transition-colors duration-200">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfilePage;