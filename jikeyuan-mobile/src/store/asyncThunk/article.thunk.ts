// 获取文章详情数据
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArticleCommentsRequestParams,
  ArticleCommentsResponse,
  ArticleDetailRequestParams,
  ArticleDetailResponse,
  CancelCollectArticleRequestParams,
  CancelCollectArticleResponse,
  CancelFollowingsAuthAxiosResponse,
  CancelFollowingsAuthRequestParams,
  CancelLikeArticleRequestParams,
  CancelLikeArticleResponse,
  CollectArticleRequestParams,
  CollectArticleResponse,
  FollowingsAuthAxiosResponse,
  FollowingsAuthRequestParams,
  LikeArticleRequestParams,
  LikeArticleResponse,
  LikeCommentRequestParams,
  PublishCommentToArticleRequestParams,
  PublishCommentToArticleResponse,
} from "@/types/article";
import {
  cancelFollowingsAuth,
  cancelLikeComment,
  followingsAuth,
  getArticleCommentsList,
  getArticleDetail,
  likeComment,
  postCancelCollectArticle,
  postCancelLikeArticle,
  postCollectArticle,
  postLikeArticle,
  publishCommentToArticle,
} from "@/api/articleDetailApi";

export const fetchArticleDetail = createAsyncThunk<
  ArticleDetailResponse,
  ArticleDetailRequestParams
>("article/articleDetail", async (payload) => {
  let { article_id } = payload;
  try {
    return getArticleDetail({ article_id });
  } catch (error) {
    throw new Error("文章详情获取失败");
  }
});

// 获取文章详情页评论列表
export const fetchArticleDetailComments = createAsyncThunk<
  ArticleCommentsResponse,
  ArticleCommentsRequestParams
>("article/articleDetailComment", (payload) => {
  let { type, limit, offset, source } = payload;
  try {
    return getArticleCommentsList({
      type,
      limit,
      offset,
      source,
    });
  } catch (error) {
    throw new Error("文章详情评论列表获取失败");
  }
});

export const fetchLikeArticle = createAsyncThunk<
  LikeArticleResponse,
  LikeArticleRequestParams
>("article/likeArticle", (payload) => {
  let { art_id } = payload;
  try {
    return postLikeArticle(art_id);
  } catch (error) {
    throw new Error("对文章点赞失败");
  }
});

// 对文章取消点赞
export const fetchCancelLikeArticle = createAsyncThunk<
  CancelLikeArticleResponse,
  CancelLikeArticleRequestParams
>("article/cancelLikeArticle", (payload) => {
  let { art_id } = payload;
  try {
    return postCancelLikeArticle(art_id);
  } catch (error) {
    throw new Error("对文章取消点赞失败");
  }
});

// 收藏文章
export const fetchCollectArticle = createAsyncThunk<
  CollectArticleResponse,
  CollectArticleRequestParams
>("article/collectArticle", (payload) => {
  let { art_id } = payload;
  try {
    return postCollectArticle(art_id);
  } catch (error) {
    throw new Error("对文章取消点赞失败");
  }
});

// 取消收藏文章
export const fetchCancelCollectArticle = createAsyncThunk<
  CancelCollectArticleResponse,
  CancelCollectArticleRequestParams
>("article/cancelCollectArticle", (payload) => {
  let { art_id } = payload;
  try {
    return postCancelCollectArticle(art_id);
  } catch (error) {
    throw new Error("对文章取消点赞失败");
  }
});

export const fetchPublishCommentToArticle = createAsyncThunk<
  PublishCommentToArticleResponse,
  PublishCommentToArticleRequestParams
>("article/publishCommentToArticle", (payload) => {
  const { art_id, content, target } = payload;

  try {
    return publishCommentToArticle({
      art_id,
      content,
      target,
    });
  } catch (error) {
    throw new Error("对文章评论失败");
  }
});

// 关注用户
export const fetchFollowingsAuth = createAsyncThunk<
  FollowingsAuthAxiosResponse,
  FollowingsAuthRequestParams
>("article/followingsAuth", (payload) => {
  let { target } = payload;
  try {
    return followingsAuth({ target });
  } catch (error) {
    throw new Error("关注用户失败");
  }
});

// 取消关注用户
export const fetchCancelFollowingsAuth = createAsyncThunk<
  CancelFollowingsAuthAxiosResponse,
  CancelFollowingsAuthRequestParams
>("article/cancelFollowingsAuth", (payload) => {
  let { target } = payload;
  try {
    return cancelFollowingsAuth({ target });
  } catch (error) {
    throw new Error("取消关注失败");
  }
});

// 对评论进行点赞或取消点赞
export const fetchIsLikeComment = createAsyncThunk<
  LikeCommentRequestParams,
  LikeCommentRequestParams
>("article/likeComment", (payload) => {
  const { target, is_liking } = payload;

  // 判断用户是要取消点赞还是点赞，如果是false就是要点赞，否则就是取消点赞，false是当前没有点赞的状态，true是点赞了的状态
  if (!is_liking) {
    try {
      likeComment({ target });
      return { target, is_liking };
    } catch (error) {
      throw new Error("点赞失败");
    }
  } else {
    try {
      cancelLikeComment({ target });
      return { target, is_liking };
    } catch (error) {
      throw new Error("取消点赞失败");
    }
  }
});
