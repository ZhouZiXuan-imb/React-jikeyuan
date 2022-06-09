import React, { useEffect, useState } from "react";
import "./index.scss";
import { Tabs } from "antd-mobile";

import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import { changeActiveKey } from "@/store/home.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import ArticleListComp from "../../components/ArticleListComp";
import ChannelsPopupComp from "@/components/ChannelsPopupComp";
import { fetchArticles, fetchChannels } from "@/store/asyncThunk/home.thunk";
import { useNavigate } from "react-router";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 从store中获取数据
  // 获取频道列表
  const channelsList = useAppSelector((state) => state.home.channels);

  const channelActiveKey = useAppSelector(
    (state) => state.home.channelActiveKey
  );

  const articlesList = useAppSelector((state) => state.home.articles);

  const pre_timestamp = useAppSelector((state) => state.home.pre_timestamp);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(
      fetchArticles({
        channelId: channelActiveKey,
        timestamp: new Date().valueOf(),
      })
    );
  }, [dispatch, channelActiveKey]);

  function handleChangeTab(channelId: string) {
    dispatch(changeActiveKey(channelId));
  }

  async function articlesLoadMore() {
    return dispatch(
      fetchArticles({
        channelId: channelActiveKey,
        timestamp: pre_timestamp ? pre_timestamp : new Date().valueOf(),
      })
    );
  }

  const [isShowUpdateChannels, setIsShowUpdateChannels] = useState(false);

  // 编辑频道列表的弹出层
  function handleShowChannelsList() {
    setIsShowUpdateChannels(true);
  }

  return (
    <>
      <div className="home-top">
        <Tabs onChange={handleChangeTab} activeKey={channelActiveKey}>
          {channelsList.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <div className="scroll-wrapper">
                <ArticleListComp
                  columnData={articlesList}
                  articlesLoadMore={articlesLoadMore}
                />
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
        {/*搜索按钮和更多按钮*/}
        <div className="bar-btn">
          <i className={"icon"} onClick={() => navigate("/search")}>
            <SearchOutline />
          </i>
          <i className={"icon"} onClick={handleShowChannelsList}>
            <UnorderedListOutline />
            <ChannelsPopupComp
              isShowUpdateChannels={isShowUpdateChannels}
              setIsShowUpdateChannels={setIsShowUpdateChannels}
            />
          </i>
        </div>
      </div>
    </>
  );
}

export default Home;
