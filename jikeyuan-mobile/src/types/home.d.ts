// 根据频道过去文章列表
import { AxiosResponse } from "axios";
import { Channel, UserArticle } from "@/types/data";

export type UserArticleResponse = AxiosResponse<UserArticle>;

export type AllArticlesRequestParams = { channelId: string; timestamp: number };

// 获取所有频道的返回数据
export type AllArticleResponse = {
  channels: Channel[];
};

// 所有频道的返回数据被AxiosPromise包裹的返回值
export type AllArticleAxiosResponse = AxiosResponse<AllArticleResponse>;

// 删除频道的请求参数
export type RemoveChannelRequestParams = {
  target: string;
};
