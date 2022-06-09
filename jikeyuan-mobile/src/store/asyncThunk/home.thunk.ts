// 获取频道列表数据
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Channel} from "@/types/data";
import {getToken} from "@/utils/token";
import {getAllChannelsList, getArticlesList, getChannelsList} from "@/api/homeApi";
import {setLocalChannels} from "@/utils/channel";
import {AllArticleAxiosResponse, AllArticlesRequestParams, UserArticleResponse} from "@/types/home";

export const fetchChannels = createAsyncThunk<Channel[]>(
    "home/fetchChannelsStatus",
    async () => {
        // 调用api接口获取数据
        try {
            let token = getToken();
            if (token) {
                let {
                    data: { channels },
                } = await getChannelsList();
                return channels;
            } else {
                const localChannels = JSON.parse(
                    localStorage.getItem("jky-m-channels") ?? "[]"
                ) as Channel[];
                if (localChannels.length === 0) {
                    // 如果  length===0  就代表本地没有数据，调用接口获取数据
                    let {
                        data: { channels },
                    } = await getChannelsList();
                    // 把获取到的channels保存到本地
                    setLocalChannels(channels);
                    // 返回给reducer
                    return channels;
                }
                // 如果本地有数据，直接把数据返回给reducer
                return localChannels;
            }
        } catch (error) {
            throw new Error("频道列表数据获取失败");
        }
    }
);
// 获取当前频道对应的新闻推荐列表
export const fetchArticles = createAsyncThunk<
    UserArticleResponse,
    AllArticlesRequestParams
    >("home/fetchArticlesStatus", (payload) => {
    let { channelId, timestamp } = payload;
    try {
        return getArticlesList(channelId, timestamp);
    } catch (error) {
        throw new Error("新闻推荐列表获取失败");
    }
});

// 获取所有频道列表
export const fetchAllChannels = createAsyncThunk<AllArticleAxiosResponse>(
    "home/fetchAllChannelsStatus",
    () => {
        try {
            return getAllChannelsList();
        } catch (error) {
            throw new Error("所有频道列表获取失败");
        }
    }
);