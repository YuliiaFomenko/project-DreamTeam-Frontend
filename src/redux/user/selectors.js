export const selectUserInfo = (state, userId) => state.user.users[userId];

export const selectSavedArticles = (state) => state.user.savedArticles;
export const selectSavedArticlesPagination = (state) =>
  state.user.savedArticlesPagination;
export const selectOwnArticles = (state) => state.user.ownArticles;
export const selectOwnArticlesPagination = (state) =>
  state.user.ownArticlesPagination;
export const selectTopAuthors = (state) => state.user.topAuthors;
export const selectTopAuthorsPagination = (state) =>
  state.user.topAuthorsPagination;

export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
