import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getArticles, getChannels} from "../api/contentApi";

// 获取频道列表
export const getChannelsList = createAsyncThunk("article/channels",  () => {
    try {
        return getChannels();
    } catch (err) {
        throw new Error("频道列表获取失败")
    }
})

// 获取文章列表
export const getArticleList = createAsyncThunk("article/articles", (payload) => {
    try {
        return getArticles(payload);
    } catch (err) {
        throw new Error("文章列表获取失败")
    }
})

const {reducer: articleReducer} = createSlice({
    name: "article",
    initialState: {
        channels: [],
        articles: [],
        page: 1,
        per_page: 10,
        total_count: 0,
    },
    reducers: {
    },
    extraReducers: {
        [getChannelsList.fulfilled](state, action) {
            state.channels = action.payload?.data.channels;
        },
        [getArticleList.fulfilled](state, {payload: {data}}) {
            state.articles = data.results.filter(item => {
                item.key = item.id
                return true;
            });
            state.page = data.page;
            state.per_page = data.per_page;
            state.total_count = data.total_count;
        }
    }
})


export default articleReducer;