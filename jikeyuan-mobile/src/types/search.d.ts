import { AxiosResponse } from "axios";

export type SearchSuggestionRequestParams = {
  q: string; // 请求的前缀词句
};

export type SearchSuggestion = {
  options: string[]; // 选项词条
};

export type SearchSuggestionResponse = AxiosResponse<SearchSuggestion>;

export type SearchResultsRequestParams = {
  page?: number; // 页数，不传默认为1
  per_page?: number; // 每页数量，不传每页数量由后端决定
  q: string; // 搜索关键词
};

export type SearchResult = {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  comm_count: number;
  pubdate: string;
  cover: {
    type: string;
    images: string[];
  };
  like_count: number;
  collect_count: number;
};

export type SearchResults = {
  page: number;
  per_page: number;
  results: SearchResult[];
  total_count: number;
};

export type SearchResultsResponse = AxiosResponse<SearchResults>;
