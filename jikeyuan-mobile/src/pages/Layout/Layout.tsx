import React from "react";
import TabBarComp from "../../components/TabBarComp";
import "./index.scss";
import { Route, Routes } from "react-router";
import HomePage from "../Home";
import QuestionAnsweringPage from "../QuestionAnswering";
import VideoPage from "../Video";
import MyPage from "../My";
import Auth from "@/components/Auth";

function Layout() {
  return (
    <>
      <div className="layout">
        <div className="layout-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/QA" element={<QuestionAnsweringPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route
              path="/my"
              element={
                <Auth>
                  <MyPage />
                </Auth>
              }
            />
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
