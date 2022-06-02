import React, { ReactNode } from "react";
import { NavBar, Popup, TextArea } from "antd-mobile";

type PublishCommentCompPropsType = {
  isShowCommentCard: boolean;
  setIsShowCommentCard: Function;
  commentValue: string;
  setCommentValue: Function;
  right: ReactNode;
};

function PublishCommentPopupComp(props: PublishCommentCompPropsType) {
  let {
    isShowCommentCard,
    setIsShowCommentCard,
    commentValue,
    setCommentValue,
    right,
  } = props;
  return (
    <Popup visible={isShowCommentCard} bodyStyle={{ height: "100vh" }}>
      <NavBar right={right} onBack={() => setIsShowCommentCard(false)}>
        评论文章
      </NavBar>
      <div className="comment-value">
        <TextArea
          placeholder="说点什么~"
          value={commentValue}
          onChange={(val) => {
            setCommentValue(val);
          }}
        />
      </div>
    </Popup>
  );
}

export default PublishCommentPopupComp;
