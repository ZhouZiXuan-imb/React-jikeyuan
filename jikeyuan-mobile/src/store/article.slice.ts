import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleComments, ArticleDetail } from "@/types/article";
import {
  fetchArticleDetail,
  fetchArticleDetailComments,
  fetchCancelCollectArticle,
  fetchCancelFollowingsAuth,
  fetchCancelLikeArticle,
  fetchCollectArticle,
  fetchFollowingsAuth,
  fetchIsLikeComment,
  fetchLikeArticle,
  fetchPublishCommentToArticle,
} from "@/store/asyncThunk/article.thunk";

export const ARTICLE_DETAIL_SLICE_NAME = "article";

type initialStateType = {
  comment: ArticleComments;
  article: ArticleDetail;
};

const initialState: initialStateType = {
  comment: {
    total_count: 0, // 文章评论总数 或 评论的回复总数
    end_id: "", // 所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL
    last_id: "", // 次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
    results: [],
    like_count: 0,
  },
  article: {
    art_id: "", // 文章ID
    title: "", // 文章标题
    pubdate: "", // 发布日期
    aut_id: "", // 作者id
    aut_name: "", // 作者名
    aut_photo: "", // 作者头像url 无图片，默认为null
    is_followed: false, // 是否关注了作者
    attitude: -1, // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    content: "", // 文章内容
    is_collected: false, // 是否收藏了文章
  },
};

const { actions, reducer: articleDetailReducer } = createSlice({
  name: ARTICLE_DETAIL_SLICE_NAME,
  initialState: initialState,
  reducers: {
    updateCommentIsLikingAndLikeCount(
      state,
      payload: PayloadAction<{ target: string; is_liking: boolean }>
    ) {
      console.log(payload);
      const {
        payload: { is_liking, target },
      } = payload;

      if (!is_liking) {
        state.comment.results.map((com) => {
          if (com.com_id === target) {
            com.like_count += 1;
            com.is_liking = !is_liking;
            state.comment.like_count += 1;
          }
          return com;
        });
      } else {
        state.comment.results.map((com) => {
          if (com.com_id === target) {
            com.like_count -= 1;
            com.is_liking = !is_liking;
            state.comment.like_count -= 1;
          }
          return com;
        });
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArticleDetailComments.fulfilled, (state, action) => {
      let {
        payload: {
          data: { end_id, last_id, total_count, results },
        },
      } = action;

      // 计算评论有多少个点赞
      let like_count = 0;
      results.forEach((comment) => {
        like_count += comment.like_count;
      });

      // 赋值
      state.comment = {
        end_id,
        results,
        last_id,
        total_count,
        like_count,
      };
    });
    builder.addCase(fetchArticleDetail.fulfilled, (state, action) => {
      let {
        payload: {
          data: {
            attitude,
            art_id,
            aut_id,
            aut_name,
            aut_photo,
            is_collected,
            is_followed,
            content,
            title,
            pubdate,
          },
        },
      } = action;

      state.article = {
        attitude,
        art_id,
        aut_id,
        aut_name,
        aut_photo,
        is_collected,
        is_followed,
        content,
        title,
        pubdate,
      };
    });
    builder.addCase(fetchLikeArticle.fulfilled, (state) => {
      state.article.attitude = 1;
    });
    builder.addCase(fetchCancelLikeArticle.fulfilled, (state) => {
      state.article.attitude = -1;
    });
    builder.addCase(fetchCollectArticle.fulfilled, (state) => {
      state.article.is_collected = true;
    });
    builder.addCase(fetchCancelCollectArticle.fulfilled, (state) => {
      state.article.is_collected = false;
    });
    builder.addCase(fetchPublishCommentToArticle.fulfilled, (state, action) => {
      let {
        data: { new_obj },
      } = action.payload;

      // 把最新的评论添加到results中
      state.comment.results = [new_obj, ...state.comment.results];
      state.comment.total_count += 1;
    });
    builder.addCase(fetchFollowingsAuth.fulfilled, (state) => {
      state.article.is_followed = true;
    });
    builder.addCase(fetchCancelFollowingsAuth.fulfilled, (state) => {
      state.article.is_followed = false;
    });
    builder.addCase(fetchIsLikeComment.fulfilled, (state, action) => {
      let {
        payload: { target, is_liking },
      } = action;

      state.comment.results = state.comment.results.map((item) => {
        if (item.com_id === target) {
          item.is_liking = !is_liking;

          if (is_liking) {
            item.like_count -= 1;
            state.comment.like_count -= 1;
          } else {
            item.like_count += 1;
            state.comment.like_count += 1;
          }
        }

        return item;
      });
    });
  },
});

export const { updateCommentIsLikingAndLikeCount } = actions;

export default articleDetailReducer;
