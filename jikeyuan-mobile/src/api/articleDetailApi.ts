import {
  ArticleCommentsRequestParams,
  ArticleDetailRequestParams,
  CancelLikeCommentRequestParams,
  FollowingsAuthRequestParams,
  LikeCommentRequestParams,
  PublishCommentToArticleRequestParams,
} from "@/types/article";
import { requestWidthToken } from "@/utils/request";
import { AxiosPromise } from "axios";

export function getArticleCommentsList<T>({
  type,
  source,
  offset,
  limit,
}: ArticleCommentsRequestParams): AxiosPromise<T> {
  return requestWidthToken.get("/comments", {
    type,
    source,
    offset,
    limit,
  });
}

export function getArticleDetail<T>({
  article_id,
}: ArticleDetailRequestParams): AxiosPromise<T> {
  return requestWidthToken.get(`/articles/${article_id}`);
}

export function postLikeArticle<T>(art_id: string): AxiosPromise<T> {
  return requestWidthToken.post("/article/likings", { target: art_id });
}

export function postCancelLikeArticle<T>(art_id: string): AxiosPromise<T> {
  return requestWidthToken.delete(`/article/likings/${art_id}`);
}

export function postCollectArticle<T>(art_id: string): AxiosPromise<T> {
  return requestWidthToken.post("/article/collections", { target: art_id });
}

export function postCancelCollectArticle<T>(art_id: string): AxiosPromise<T> {
  return requestWidthToken.delete(`/article/collections/${art_id}`);
}

// 对文章进行评论
export function publishCommentToArticle<T>({
  target,
  art_id,
  content,
}: PublishCommentToArticleRequestParams): AxiosPromise<T> {
  return requestWidthToken.post("/comments", { target, art_id, content });
}

// 关注用户
export function followingsAuth<T>({
  target,
}: FollowingsAuthRequestParams): AxiosPromise<T> {
  return requestWidthToken.post("/user/followings", { target });
}

// 取消关注用户
export function cancelFollowingsAuth<T>({
  target,
}: FollowingsAuthRequestParams): AxiosPromise<T> {
  return requestWidthToken.delete(`/user/followings/${target}`);
}

// 对评论点赞
export function likeComment<T>({
  target,
}: LikeCommentRequestParams): AxiosPromise<T> {
  return requestWidthToken.post("/comment/likings", { target });
}

export function cancelLikeComment<T>({
  target,
}: CancelLikeCommentRequestParams): AxiosPromise<T> {
  return requestWidthToken.delete(`/comment/likings/${target}`);
}
