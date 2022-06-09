import { requestWidthOutToken, requestWidthToken } from "@/utils/request";
import {
  SearchResultsRequestParams,
  SearchSuggestionRequestParams,
} from "@/types/search";

// 获取搜索联想建议
export function getSuggestion({ q }: SearchSuggestionRequestParams) {
  return requestWidthToken.get("/suggestion", { q });
}

// 获取搜索结果
export function getSearchResult(searchParams: SearchResultsRequestParams) {
  return requestWidthOutToken.get("/search", searchParams);
}
