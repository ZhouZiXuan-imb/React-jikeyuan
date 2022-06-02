// 获取所有频道的请求参数
import { Channel } from "@/types/home";
import { AxiosPromise, AxiosResponse } from "axios";

export type Channel = {
  id: number;
  name: string;
};

export type UserChannel = {
  channels: Channel[];
};

export type UserChannelResponse = AxiosResponse<UserChannel> | Channel[];

// 返回的文章的类型
export type Article = {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  comm_count: string;
  pubdate: string;
  cover: {
    type: string;
    images: string[];
  };
};

export type UserArticle = {
  pre_timestamp: number;
  results: Article[];
};
