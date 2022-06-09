import React, { useState } from "react";
import { List, NavBar, SearchBar } from "antd-mobile";
import { SearchOutline, DeleteOutline, CloseOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchSuggestion } from "@/store/asyncThunk/search.thunk";
import {
  addSearchHistory,
  clearSuggestion,
  removeSearchHistory,
} from "@/store/search.slice";

let timer: number;

function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");

  // 控制显示联想建议还是历史记录
  const [isShowSuggest, setIsShowSuggest] = useState(false);

  // 输入的时候，如果用户一直在输入，只执行最后一次输入的内容
  function handleSearchArticle(value: string) {
    setSearchValue(value);
    setIsShowSuggest(true);
    if (value.trim().length === 0) {
      return dispatch(clearSuggestion());
    }

    // 防抖
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      dispatch(fetchSuggestion({ q: value }));
    }, 500);
  }

  // 搜索方法
  function onSearch() {
    handleSaveLocalHistory(searchValue);
  }

  const { suggestion } = useAppSelector((state) => state.search);

  const searchRight = (
    <div onClick={onSearch} className="search-right">
      <span>搜索</span>
    </div>
  );

  const { history: searchHistory } = useAppSelector((state) => state.search);

  function handleSaveLocalHistory(value: string) {
    navigate(`/search/result?q=${value}`);

    dispatch(addSearchHistory(value));

    setIsShowSuggest(false);
  }

  function handleRemoveSearchHistory(event: any, value: string) {
    // console.log(111);
    event.stopPropagation();
    dispatch(removeSearchHistory(value));
  }

  return (
    <div className="search">
      <NavBar right={searchRight} onBack={() => navigate(-1)}>
        <SearchBar
          placeholder="请输入内容"
          value={searchValue}
          onChange={handleSearchArticle}
        />
      </NavBar>
      {isShowSuggest ? (
        <div className="suggest-list">
          <List>
            {suggestion.map((item, index) => (
              <List.Item
                key={index}
                onClick={() => handleSaveLocalHistory(item)}
              >
                <i className="icon">
                  <SearchOutline />
                </i>
                {item}
              </List.Item>
            ))}
          </List>
        </div>
      ) : searchHistory.length < 1 ? null : (
        <div className="search-history">
          <div className="search-history-top">
            <span>历史记录</span>
            <i className="icon">
              <DeleteOutline fontSize={16} />
            </i>
          </div>
          <List>
            {searchHistory.map((item) => (
              <List.Item
                key={item}
                clickable={false}
                arrow={
                  <i
                    className="icon"
                    onClick={(event) => handleRemoveSearchHistory(event, item)}
                  >
                    <CloseOutline />
                  </i>
                }
                onClick={() => handleSaveLocalHistory(item)}
              >
                <span>{item}</span>
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

export default Search;
