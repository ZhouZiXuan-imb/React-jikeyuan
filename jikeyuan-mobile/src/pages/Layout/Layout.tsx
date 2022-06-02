import React from "react";
import TabBarComp from "../../components/TabBarComp";
import "./index.scss";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "../Home";
import QuestionAnsweringPage from "../QuestionAnswering";
import VideoPage from "../Video";
import MyPage from "../My";

function Layout() {
  return (
    <>
      <div className="layout">
        <div className="layout-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/QA" element={<QuestionAnsweringPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/my" element={<MyPage />} />
          </Routes>
        </div>
        <div className="layout-tabbar">
          <TabBarComp />
        </div>
      </div>
    </>
  );
}

export default Layout;
