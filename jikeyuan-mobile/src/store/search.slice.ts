import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSearchResult,
  fetchSuggestion,
} from "@/store/asyncThunk/search.thunk";
import { SearchResults } from "@/types/search";
import {
  getLocalSearchHistory,
  setLocalSearchHistory,
} from "@/utils/suggestion";

export const SEARCH_SLICE_NAME = "search";

type initialStateType = {
  suggestion: string[];
  searchResults: SearchResults;
  history: string[];
};

const initialState: initialStateType = {
  suggestion: [],
  searchResults: {
    page: 1,
    per_page: 10,
    results: [],
    total_count: 0,
  },
  history: getLocalSearchHistory(),
};

const { actions, reducer: searchReducer } = createSlice({
  name: SEARCH_SLICE_NAME,
  initialState: initialState,
  reducers: {
    clearSuggestion(state) {
      state.suggestion = [] as string[];
    },
    clearSearchResult(state) {
      state.searchResults = {
        page: 1,
        per_page: 10,
        results: [],
        total_count: 0,
      };
    },
    addSearchHistory(state, { payload }: PayloadAction<string>) {
      // console.log(payload);
      let historyArray = state.history;
      historyArray.unshift(payload);
      // 去重历史记录
      state.history = Array.from(new Set(historyArray));

      setLocalSearchHistory(state.history);
    },
    removeSearchHistory(state, { payload }: PayloadAction<string>) {
      state.history = state.history.filter((item) => item !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSuggestion.fulfilled, (state, action) => {
      let {
        payload: {
          data: { options },
        },
      } = action;

      state.suggestion = options;
    });
    builder.addCase(fetchSearchResult.fulfilled, (state, action) => {
      console.log(action);
      const {
        payload: {
          data: { page, per_page, results, total_count },
        },
      } = action;

      state.searchResults = {
        page,
        per_page,
        results: [...state.searchResults.results, ...results],
        total_count,
      };
    });
  },
});

export const {
  clearSuggestion,
  clearSearchResult,
  addSearchHistory,
  removeSearchHistory,
} = actions;

export default searchReducer;
