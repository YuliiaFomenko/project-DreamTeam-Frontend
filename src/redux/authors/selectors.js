import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectError = (state) => state.authors.error;
export const selectLoading = (state) => state.authors.loading;
export const selectLoadingApp = (state) => state.authors.loadingApp;
export const selectAuthors = (state) => state.authors.items;
// export const selectFilteredAuthors = createSelector(
//   [selectAuthors, selectNameFilter],
//   (authorsList, searchName) =>
//     authorsList.filter(
//       (card) =>
//         card.name.toLowerCase().includes(searchName.toLowerCase()) ||
//         card.number.includes(searchName)
//     )
// );
