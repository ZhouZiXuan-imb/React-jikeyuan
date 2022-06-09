import React from "react";
import { ArticleComments } from "@/types/article";
import { Image } from "antd-mobile";
import "./index.scss";
import { RightOutline, LikeOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAppDispatch } from "@/hooks/store";
import { fetchIsLikeComment } from "@/store/asyncThunk/article.thunk";
// dayjs插件需要继承relativeTime才可以使用to方法
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

type propsType = {
  columnData: ArticleComments["results"];
};

function CommentListComp(props: propsType) {
  let { columnData } = props;
  const dispatch = useAppDispatch();
  // 对评论点赞
  function handleLikeComment(com_id: string, is_liking: boolean) {
    // 发起请求
    dispatch(fetchIsLikeComment({ target: com_id, is_liking }));
  }

  return (
    <>
      <div className="comments-list-container">
        {columnData.map((comment) => (
          <div className="comment-item" key={comment.com_id}>
            <Image
              fit={"cover"}
              style={{ borderRadius: 32 }}
              src={comment.aut_photo}
              alt="用户头像"
              width={33.75}
              height={33.75}
            />
            <div className="comment-item-info">
              <p className="comment-username-and-like">
                <span className="username">{comment.aut_name}</span>
                <span className="like">
                  <span>{comment.like_count}</span>
                  <i
                    className="icon"
                    onClick={() =>
                      handleLikeComment(comment.com_id, comment.is_liking)
                    }
                  >
                    <LikeOutline
                      color={comment.is_liking ? "rgb(255, 95, 43)" : ""}
                    />
                  </i>
                </span>
              </p>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-reply">
                <span className="reply">
                  回复
                  <i className="icon">
                    <RightOutline />
                  </i>
                </span>
                <span className="comment-timer">
                  {dayjs().to(dayjs(comment.pubdate), true)}前
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentListComp;
