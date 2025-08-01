export const selectAllArticles = (state) => state.articles.articles;
export const selectArticlesPagination = (state) =>
  state.articles.articlesPagination;

export const selectPopularArticles = (state) => state.articles.popularArticles;
export const selectPopularArticlesPagination = (state) =>
  state.articles.popularArticlesPagination;

export const selectRandomArticles = (state) => state.articles.randomArticles;

export const selectArticleById = (state) => state.articles.selectedArticle;

export const selectArticlesIsLoading = (state) => state.articles.isLoading;
export const selectArticlesError = (state) => state.articles.error;
