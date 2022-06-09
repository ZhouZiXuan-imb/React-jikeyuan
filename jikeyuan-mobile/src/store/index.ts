import { configureStore } from "@reduxjs/toolkit";
import homeReducer, { HOME_SLICE_NAME } from "../store/home.slice";
import articleDetailReducer, {
  ARTICLE_DETAIL_SLICE_NAME,
} from "@/store/article.slice";
import profileReducer, { PROFILE_SLICE_NAME } from "@/store/profile.slice";
import searchReducer, { SEARCH_SLICE_NAME } from "@/store/search.slice";

export const store = configureStore({
  reducer: {
    [HOME_SLICE_NAME]: homeReducer,
    [ARTICLE_DETAIL_SLICE_NAME]: articleDetailReducer,
    [PROFILE_SLICE_NAME]: profileReducer,
    [SEARCH_SLICE_NAME]: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
