export const selectUserInfo = (state, userId) => state.user.users[userId];

export const selectSavedArticles = (state) => state.user.savedArticles;
export const selectOwnArticles = (state) => state.user.ownArticles;

export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
