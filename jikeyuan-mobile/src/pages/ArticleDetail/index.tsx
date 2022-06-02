import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Image,
  NavBar,
  Popup,
  TextArea,
  Toast,
} from "antd-mobile";
import "./index.scss";
import { useNavigate, useParams } from "react-router";
import DOMPurify from "dompurify";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  ArticleCommentsRequestParams,
  ArticleDetailRequestParams,
  PublishCommentToArticleResponse,
} from "@/types/article";
import CommentListComp from "@/components/CommentListComp";
import {
  MessageOutline,
  EditSOutline,
  LikeOutline,
  HeartOutline,
  UploadOutline,
} from "antd-mobile-icons";
import { isAuth } from "@/utils/token";
import {
  fetchArticleDetail,
  fetchArticleDetailComments,
  fetchCancelCollectArticle,
  fetchCancelFollowingsAuth,
  fetchCancelLikeArticle,
  fetchCollectArticle,
  fetchFollowingsAuth,
  fetchLikeArticle,
  fetchPublishCommentToArticle,
} from "@/store/asyncThunk/article.thunk";
import PublishCommentComp from "@/components/PublishCommentPopupComp";

function ArticleDetail() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const dispatch = useAppDispatch();
  const locationParams = useParams();

  let articleDetailCommentsRequestParams =
    useMemo<ArticleCommentsRequestParams>(
      () => ({
        type: "a",
        source: locationParams.id!,
      }),
      [locationParams.id]
    );

  // 获取文章详情数据

  // 请求文章详情评论列表
  useEffect(() => {
    dispatch(fetchArticleDetailComments(articleDetailCommentsRequestParams));
  }, [dispatch, articleDetailCommentsRequestParams]);

  let articleDetailRequestParams = useMemo<ArticleDetailRequestParams>(
    () => ({
      article_id: locationParams.id!,
    }),
    [locationParams.id]
  );

  useEffect(() => {
    dispatch(fetchArticleDetail(articleDetailRequestParams));
  }, [dispatch]);

  // 获取文章详情评论列表
  const {
    results: articleComments,
    total_count,
    like_count,
  } = useAppSelector((state) => state.article.comment);

  const {
    art_id, // 文章ID
    title, // 文章标题
    pubdate, // 发布日期
    aut_name, // 作者名
    aut_photo, // 作者头像url 无图片，默认为null
    is_followed, // 是否关注了作者
    attitude, // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    content, // 文章内容
    is_collected, // 是否收藏了文章
    aut_id,
  } = useAppSelector((state) => state.article.article);

  // 点击评论按钮
  function handleChangeScrollTop() {
    // 跳转可视区scrolltop
  }

  // 点击点赞按钮
  async function likeArticle(art_id: string) {
    // 判断是否登录，没有登陆需要登录后点赞
    // if (!isAuth()) return navigate("/login");
    // 如果是-1 点击了代表用户要点赞
    if (attitude === -1) {
      // 发请求修改文章喜欢状态
      // 调用store中的方法，修改当前store中的文章详情的喜欢文章的状态
      dispatch(fetchLikeArticle({ art_id }));
      // 请提示弹框
      Toast.show({
        icon: "success",
        content: "点赞成功",
      });
    } else {
      // 否则就是要取消点赞
      // 调用store中的方法，修改当前store中的文章详情的喜欢文章的状态
      dispatch(fetchCancelLikeArticle({ art_id }));
      // 请提示弹框
      Toast.show({
        icon: "success",
        content: "取消点赞",
      });
    }
  }

  function collectArticle(art_id: string) {
    // 判断是否登录，没有登陆需要登录后点赞
    // if (!isAuth()) return navigate("/login");
    if (!is_collected) {
      // 如果没有收藏了就收藏
      dispatch(fetchCollectArticle({ art_id }));

      Toast.show({
        icon: "success",
        content: "收藏成功",
      });
    } else {
      // 否则就取消收藏
      dispatch(fetchCancelCollectArticle({ art_id }));

      Toast.show({
        icon: "success",
        content: "取消收藏",
      });
    }
  }

  const [isShowCommentCard, setIsShowCommentCard] = useState<boolean>(false);
  // 评论内容
  const [commentValue, setCommentValue] = useState<string>("");

  // 发表文章功能
  async function publishComment() {
    // 判断评论内容是否为空
    if (commentValue.trim().length === 0)
      return Toast.show({ icon: "fail", content: "评论内容不能为空" });
    // 调用发送请求的中间键
    dispatch(
      fetchPublishCommentToArticle({
        art_id,
        content: commentValue,
        target: art_id,
      })
    );

    // 关闭弹框并清除输入框内容
    setCommentValue("");
    setIsShowCommentCard(false);
  }

  // 点击抢沙发按钮 弹出框的导航栏的右侧
  const right = (
    <div style={{ height: "100%" }}>
      <span
        style={{
          display: "inline-block",
          color: "#fc6627",
          fontSize: 14,
          height: "100%",
          lineHeight: 3,
          padding: "0 5px",
          boxSizing: "border-box",
        }}
        onClick={publishComment}
      >
        发表
      </span>
    </div>
  );

  // 关注用户
  function handleFollowingsAuth() {
    dispatch(fetchFollowingsAuth({ target: aut_id }));
  }

  // 取消关注用户
  function handleCancelFollowingsAuth() {
    dispatch(fetchCancelFollowingsAuth({ target: aut_id }));
  }

  return (
    <>
      <div className="article-detail">
        <div className="article-top">
          <NavBar onBack={back}></NavBar>
        </div>

        <div className="article-title-and-content">
          <div className="scroll">
            <div className="article-title">
              <h3 className={"title"}>{title}</h3>

              <p className={"article-num"}>
                <span className={"article-date"}>{pubdate}</span>
                <span className={"article-read"}>5阅读</span>
                <span className={"article-comment"}>{total_count}评论</span>
              </p>

              <div className={"article-author"}>
                <Image fit="cover" src={aut_photo} alt="" />
                <p className={"article-author-name"}>{aut_name}</p>
                {is_followed ? (
                  <Button
                    shape="rounded"
                    color="default"
                    onClick={handleCancelFollowingsAuth}
                  >
                    已关注
                  </Button>
                ) : (
                  <Button
                    shape="rounded"
                    color="warning"
                    onClick={handleFollowingsAuth}
                  >
                    +关注
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="article-content">
            <div className="article-top-line"></div>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
              }}
            ></div>
            <div className="timer">发布文章日期：{pubdate}</div>
          </div>

          <div className="article-comments">
            <div className="comment-title">
              <p>全部评论({total_count})</p>
              <p>{like_count} 点赞</p>
            </div>
            {total_count !== 0 ? (
              <CommentListComp columnData={articleComments} />
            ) : (
              <div className={"none"}>
                <Image
                  src={"/images/none.21d1f2fd.png"}
                  alt=""
                  fit={"cover"}
                  height={160}
                  width={160}
                />
                <span>还没有人评论哦</span>
              </div>
            )}
          </div>
        </div>

        <div className="article-bottom">
          <div
            className="input-comment"
            onClick={() => setIsShowCommentCard(true)}
          >
            <i className="icon">
              <EditSOutline />
            </i>
            <div className="value">抢沙发...</div>
            <PublishCommentComp
              isShowCommentCard={isShowCommentCard}
              setIsShowCommentCard={setIsShowCommentCard}
              commentValue={commentValue}
              setCommentValue={setCommentValue}
              right={right}
            />
          </div>

          <div className="comments" onClick={handleChangeScrollTop}>
            {total_count !== 0 ? (
              <Badge content={total_count}>
                <div className={"box"} />
              </Badge>
            ) : null}
            <i className="icon">
              <MessageOutline />
            </i>
            <div>评论</div>
          </div>

          <div
            className="like"
            onClick={() => {
              likeArticle(art_id);
            }}
          >
            <i className="icon">
              <LikeOutline color={attitude === 1 ? "#ff5f2b" : ""} />
            </i>
            <div style={{ color: attitude === 1 ? "#ff5f2b" : "" }}>点赞</div>
          </div>

          <div className="collect" onClick={() => collectArticle(art_id)}>
            <i className="icon">
              <HeartOutline color={is_collected ? "#ff5f2b" : ""} />
            </i>
            <div style={{ color: is_collected ? "#ff5f2b" : "" }}>收藏</div>
          </div>

          <div className="share">
            <i className="icon">
              <UploadOutline />
            </i>
            <div>分享</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleDetail;
