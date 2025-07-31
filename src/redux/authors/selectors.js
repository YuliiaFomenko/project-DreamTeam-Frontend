export const selectError = (state) => state.authors.error;
export const selectLoading = (state) => state.authors.loading;
export const selectLoadingApp = (state) => state.authors.loadingApp;

export const selectAuthors = (state) => state.authors.items;
export const selectAuthorsById = (state) => state.authors.selectedAuthor;

export const selectTotalAuthors = (state) => state.authors.totalAuthors;
