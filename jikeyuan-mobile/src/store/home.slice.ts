// 创建切片并导出
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postRemoveChannel } from "@/api/homeApi";
import { Article, Channel } from "@/types/data";
import differenceBy from "lodash/differenceBy";
import { getToken } from "@/utils/token";
import { getLocalChannels, setLocalChannels } from "@/utils/channel";
import sortBy from "lodash/sortBy";
import {
  fetchAllChannels,
  fetchArticles,
  fetchChannels,
} from "@/store/asyncThunk/home.thunk";

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
      let { id } = payload;
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
