export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserId = (state) => state.user.userInfo.id;
export const selectUserName = (state) => state.user.userInfo.name;
export const selectUserAvatar = (state) => state.user.userInfo.avatarUrl;

export const selectSavedArticles = (state) => state.user.savedArticles;
export const selectOwnArticles = (state) => state.user.ownArticles;

export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;