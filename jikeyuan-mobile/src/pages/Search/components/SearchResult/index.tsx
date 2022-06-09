import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchSearchResult } from "@/store/asyncThunk/search.thunk";
import { NavBar } from "antd-mobile";
import "./index.scss";
import ArticleListComp from "@/components/ArticleListComp";
import { useNavigate } from "react-router";
import { clearSearchResult } from "@/store/search.slice";

function SearchResult() {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let searchValue = params.get("q");

  useEffect(() => {
    dispatch(clearSearchResult());
    // 请求搜索结果
    dispatch(fetchSearchResult({ page: 1, q: searchValue!, per_page: 10 }));
  }, [searchValue, dispatch]);

  const { page, results } = useAppSelector(
    (state) => state.search.searchResults
  );

  function articlesLoadMore() {
    return dispatch(
      fetchSearchResult({ page: page + 1, q: searchValue!, per_page: 10 })
    );
  }

  return (
    <div className="search-result">
      <NavBar onBack={() => navigate(-1)}>搜索结果</NavBar>
      <div className="search-result-list">
        <ArticleListComp
          columnData={results}
          articlesLoadMore={articlesLoadMore}
        />
      </div>
    </div>
  );
}

export default SearchResult;
