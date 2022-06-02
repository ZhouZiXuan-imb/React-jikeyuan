// 创建切片并导出
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AllArticleAxiosResponse,
  AllArticlesRequestParams,
} from "../types/home";
import {
  getAllChannelsList,
  getArticlesList,
  getChannelsList,
  postRemoveChannel,
} from "../api/homeApi";
import { UserArticleResponse } from "@/types/home";
import { Article, Channel, UserChannel } from "@/types/data";
import differenceBy from "lodash/differenceBy";
import { getToken } from "@/utils/token";
import { getLocalChannels, setLocalChannels } from "@/utils/channel";
import sortBy from "lodash/sortBy";

export const HOME_SLICE_NAME = "home";

// 声明homeReducer中限制状态的接口
interface HomeReducerState {
  channels: Channel[];
  articles: Article[];
  channelActiveKey: string;
  pre_timestamp: number;
  optionalChannels: Channel[];
}

let channels = getLocalChannels();

// 声明状态对象
const initialState: HomeReducerState = {
  channels: [],
  articles: [],
  channelActiveKey: `${channels.length === 0 ? "0" : channels[0].id}`,
  pre_timestamp: 0,
  optionalChannels: [],
};

// 获取频道列表数据
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
        // console.log(localChannels);
        if (localChannels.length === 0) {
          console.log(111);
          // 如果  length===0  就代表本地没有数据，调用接口获取数据
          let {
            data: { channels },
          } = await getChannelsList();
          // 把获取到的channels保存到本地
          setLocalChannels(channels);
          // 返回给reducer
          return channels;
        }
        console.log(222);
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

// 创建切片
const { actions, reducer: homeReducer } = createSlice({
  name: HOME_SLICE_NAME,
  initialState,
  reducers: {
    changeActiveKey(state, { payload }) {
      state.channelActiveKey = payload;
      state.articles = [];
    },
    // 删除频道
    removeChannel(state, { payload }: PayloadAction<Channel>) {
      let { id, name } = payload;
      let channels = state.channels;
      // console.log(payload);
      let token = getToken();
      if (token) {
        // 登陆了就直接发起请求删除频道数据
        postRemoveChannel({ target: `${id}` });
      } else {
        // 未登录就获取本地的频道数据
        let channels = getLocalChannels();
        let newChannels = channels.filter((channel) => channel.id !== id);
        setLocalChannels(newChannels);
        state.channels = newChannels;
        // differenceBy方法是lodash中的一个方法，第一个参数是所有数据，第二个参数是要排除的数据，第三个参数是根据什么字段排除数据
        state.optionalChannels = sortBy(
          [...state.optionalChannels, payload],
          "id"
        );
        state.channelActiveKey = `${newChannels[0].id}`;
      }
      // console.log(channel_id);
    },
    // 添加频道
    addChannel(state, { payload }: PayloadAction<Channel>) {
      let token = getToken();
      if (token) {
        // 登录
      } else {
        // 未登录
        state.optionalChannels = state.optionalChannels.filter(
          (channel) => channel.id !== payload.id
        );

        state.channels = sortBy([...state.channels, payload], "id");
        setLocalChannels(state.channels);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      let { payload } = action;
      console.log(payload);
      state.channels = payload;
      setLocalChannels(payload);
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      let {
        payload: {
          data: { results, pre_timestamp },
        },
      } = action;
      state.pre_timestamp = pre_timestamp;
      state.articles = [...state.articles, ...results];
    });
    builder.addCase(fetchAllChannels.fulfilled, (state, action) => {
      let {
        payload: {
          data: { channels },
        },
      } = action;

      // differenceBy方法是lodash中的一个方法，第一个参数是所有数据，第二个参数是要排除的数据，第三个参数是根据什么字段排除数据
      state.optionalChannels = differenceBy(channels, state.channels, "id");
    });
  },
});

export const { changeActiveKey, removeChannel, addChannel } = actions;

export default homeReducer;
