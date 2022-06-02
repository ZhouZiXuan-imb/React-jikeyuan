import React from "react";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  UserOutline,
  VideoOutline,
} from "antd-mobile-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

import "./index.scss";

function TabBarComp() {
  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/home/QA",
      title: "问答",
      icon: <MessageOutline />,
    },
    {
      key: "/home/video",
      title: "视频",
      icon: <VideoOutline />,
    },
    {
      key: "/home/my",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  function setRouterActive(value: string) {
    navigate(value);
  }

  return (
    <>
      <TabBar activeKey={pathname} onChange={(value) => setRouterActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
}

export default TabBarComp;
