export const selectAllArticles = (state) => state.articles.articles;
export const selectPopularArticles = (state) => state.articles.popularArticles;
export const selectArticleById = (state) => state.articles.selectedArticle;

export const selectTotalArticles = (state) => state.articles.totalArticles;

export const selectArticlesIsLoading = (state) => state.articles.isLoading;
export const selectArticlesError = (state) => state.articles.error;
