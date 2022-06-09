import React, { useState } from "react";
import { Image, InfiniteScroll, List } from "antd-mobile";
import { Article } from "@/types/data";
import "./index.scss";
import LoadingComp from "../LoadingComp/index.";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { useNavigate } from "react-router";
import { SearchResult } from "@/types/search";

type PropsType = {
  columnData: Article[] | SearchResult[];
  articlesLoadMore: Function;
};

function ArticleListComp(props: PropsType) {
  // 获取新闻文章列表
  const { columnData, articlesLoadMore } = props;

  let [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    let {
      payload: {
        data: { results },
      },
    } = await articlesLoadMore();
    setHasMore(results.length > 0);
  }
  // dayjs插件需要继承relativeTime才可以使用to方法
  dayjs.extend(relativeTime);
  dayjs.locale("zh-cn");

  const navigate = useNavigate();
  function goToArticleDetail(articleId: string) {
    navigate(`/article/${articleId}`);
  }
  return (
    <>
      {columnData.length < 1 ? (
        <>
          <LoadingComp />
        </>
      ) : (
        <>
          <List>
            {columnData.map((item, index) => (
              <List.Item
                key={index}
                onClick={() => goToArticleDetail(item.art_id)}
              >
                <h3
                  className={`title ${
                    item.cover.images?.length === 1 ? "w66" : ""
                  }`}
                >
                  {item.title}
                </h3>
                <div className="article-images">
                  {item.cover.images?.map((image, index) => (
                    <Image
                      fit={"cover"}
                      key={index}
                      src={image}
                      height={82}
                      width={"100%"}
                      style={{ borderRadius: 5 }}
                    />
                  ))}
                </div>
                <div className="info_box">
                  <span>{item.aut_name}</span>
                  <span>{item.comm_count}评论</span>
                  <span>{dayjs().to(dayjs(item.pubdate), true)}前</span>
                </div>
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
      )}
    </>
  );
}

export default ArticleListComp;
