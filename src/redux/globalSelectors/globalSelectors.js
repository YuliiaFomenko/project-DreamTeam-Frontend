import { selectArticlesIsLoading } from "../articles/selectors";
import { selectIsRefreshing } from "../auth/selectors";
import { selectUserIsLoading } from "../user/selectors";

export const selectIsAnyLoading = (state) => selectArticlesIsLoading(state) || selectUserIsLoading(state) || selectIsRefreshing(state);

