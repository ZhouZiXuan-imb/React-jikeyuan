// 获取联想建议
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SearchResultsRequestParams,
  SearchResultsResponse,
  SearchSuggestionRequestParams,
  SearchSuggestionResponse,
} from "@/types/search";
import { getSearchResult, getSuggestion } from "@/api/searchApi";

// 获取搜索联想建议
export const fetchSuggestion = createAsyncThunk<
  SearchSuggestionResponse,
  SearchSuggestionRequestParams
>("search/fetchSuggestionStatus", ({ q }) => {
  try {
    return getSuggestion({ q });
  } catch (error) {
    throw new Error("联想建议获取失败");
  }
});

// 获取搜索结果
export const fetchSearchResult = createAsyncThunk<
  SearchResultsResponse,
  SearchResultsRequestParams
>("search/fetchSearchResultStatus", (payload) => {
  let { page, q, per_page } = payload;
  try {
    return getSearchResult({ page, q, per_page });
  } catch (error) {
    throw new Error("搜索结果获取失败");
  }
});
