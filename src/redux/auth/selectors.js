export const selectUser = (state) => state.auth.user;
export const selectRegistrationStatus = (state) =>
  state.auth.registrationStatus;

export const selectPendingRegistration = (state) => state.auth.pendingRegistration;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

