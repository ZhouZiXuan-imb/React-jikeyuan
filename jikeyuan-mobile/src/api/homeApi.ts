import { requestWidthOutToken, requestWidthToken } from "../utils/request";
import { AxiosPromise } from "axios";
import { RemoveChannelRequestParams } from "@/types/home";

// 获取首页顶部频道列表
export function getChannelsList<T>(): AxiosPromise<T> {
  return requestWidthToken.get("/user/channels");
}

export function getArticlesList(id: string, timestamp: number) {
  return requestWidthOutToken.get(`/articles`, {
    channel_id: id,
    timestamp: timestamp,
    // with_top: 1,
  });
}

// 获取所有频道列表
export function getAllChannelsList() {
  return requestWidthOutToken.get("/channels");
}

// 删除频道数据
export function postRemoveChannel({ target }: RemoveChannelRequestParams) {
  return requestWidthToken.delete(`/user/channels/${target}`);
}
