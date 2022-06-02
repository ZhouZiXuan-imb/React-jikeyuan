import { configureStore } from "@reduxjs/toolkit";
import homeReducer, { HOME_SLICE_NAME } from "../store/home.slice";
import articleDetailReducer, {
  ARTICLE_DETAIL_SLICE,
} from "@/store/article.slice";

export const store = configureStore({
  reducer: {
    [HOME_SLICE_NAME]: homeReducer,
    [ARTICLE_DETAIL_SLICE]: articleDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
