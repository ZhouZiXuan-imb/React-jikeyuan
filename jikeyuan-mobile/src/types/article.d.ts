import { AxiosResponse } from "axios";

// 评论列表
export type ArticleCommentsRequestParams = {
  type: string;
  source: string;
  offset?: number;
  limit?: number;
};

// 文章评论的返回值的每一项
export type ArticleComment = {
  com_id: string; // 评论或回复id
  aut_id: string; // 评论或回复的用户id
  aut_name: string; // 用户名称
  aut_photo: string; // 用户头像url
  like_count: number; // 点赞数量
  reply_count: number; // 回复数量
  pubdate: string; // 创建时间
  content: string; // 评论或回复内容
  is_liking: boolean; // 当前用户是否点赞
};

// 文章评论的返回值
export type ArticleCommentResult = ArticleComment[];

// 文章评论的返回数据
export type ArticleComments = {
  total_count: number; // 文章评论总数 或 评论的回复总数
  end_id: string; // 所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL
  last_id: string; // 次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
  results: ArticleCommentResult;
  like_count: number; // 文章评论的点赞数量
};

export type ArticleCommentsResponse = AxiosResponse<ArticleComments>;

// 文章详情的返回数据
export type ArticleDetail = {
  art_id: string; // 文章ID
  title: string; // 文章标题
  pubdate: string; // 发布日期
  aut_id: string; // 作者id
  aut_name: string; // 作者名
  aut_photo: string; // 作者头像url 无图片，默认为null
  is_followed: boolean; // 是否关注了作者
  attitude: number; // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
  content: string; // 文章内容
  is_collected: boolean; // 是否收藏了文章
};

// 文章详情的请求参数
export type ArticleDetailRequestParams = {
  article_id: string;
};

// 文章详情的返回数据
export type ArticleDetailResponse = AxiosResponse<ArticleDetail>;

// 喜欢文章的返回数据
export type LikeArticle = {
  target: string; // 点赞的文章id
};

// 喜欢文章的请求参数
export type LikeArticleRequestParams = {
  art_id: string; // 点赞的文章id
};

// 喜欢文章的返回数据
export type LikeArticleResponse = AxiosResponse<LikeArticle>;

// 取消喜欢文章的返回数据
export type CancelListArticle = {};

// 取消喜欢文章的请求参数
export type CancelLikeArticleRequestParams = {
  art_id: string;
};

// 取消喜欢文章的返回数据
export type CancelLikeArticleResponse = AxiosResponse<CancelListArticle>;

// 收藏文章的返回数据
export type CollectArticle = {
  target: string; // 收藏的文章id
};

// 收藏文章的请求参数
export type CollectArticleRequestParams = {
  art_id: string;
};

// 收藏文章的返回数据
export type CollectArticleResponse = AxiosResponse<CollectArticle>;

// 取消收藏文章的返回数据
export type CancelCollectArticle = {};

// 取消收藏文章的请求参数
export type CancelCollectArticleRequestParams = {
  art_id: string;
};

// 取消收藏文章的返回数据
export type CancelCollectArticleResponse = AxiosResponse<CancelCollectArticle>;

// 发表对文章的评论需要的参数
export type PublishCommentToArticleRequestParams = {
  target: string; // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
  content: string; // 评论内容
  art_id: string; // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
};

// 发表评论到文章的返回数据
export type PublishCommentToArticle = {
  com_id: string; // 新建的评论id
  target: string; // 评论所属的目标id
  art_id: string; // 评论所属的文章id
  new_obj: ArticleComment;
};

// 发表对文章的评论的返回数据
export type PublishCommentToArticleResponse =
  AxiosResponse<PublishCommentToArticle>;

// 关注用户请求的参数
export type FollowingsAuthRequestParams = {
  target: string; // 关注用户的id
};

// 关注用户请求的响应
export type FollowingsAuthResponse = {
  target: string[]; // 关注用户的id
};

// 关注用户的响应
export type FollowingsAuthAxiosResponse = AxiosResponse<FollowingsAuthResponse>;

// 取消关注用户请求的参数
export type CancelFollowingsAuthRequestParams = {
  target: string; // 关注用户的id
};

// 取消关注用户请求的响应
export type CancelFollowingsAuthResponse = {
  target: string[]; // 关注用户的id
};

// 取消关注用户的响应
export type CancelFollowingsAuthAxiosResponse =
  AxiosResponse<CancelFollowingsAuthResponse>;

// 对评论进行点赞的参数
export type LikeCommentRequestParams = {
  target: string; // 点赞的评论id
  is_liking?: boolean; // 判断点赞还是取消点赞
};

// 对评论进行点赞的响应
export type LikeCommentResponse = {
  target: string; // 点赞的评论id
};

export type LikeCommentAxiosResponse = AxiosResponse<LikeCommentResponse>;

export type CancelLikeCommentRequestParams = {
  target: string; // 点赞的评论id
};
