import React from "react";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import { Navigate, Route, Routes } from "react-router";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "@/pages/Login";
import ProfileInfo from "@/pages/ProfileInfo";
import Search from "@/pages/Search";
import SearchResult from "@/pages/Search/components/SearchResult";

function App() {
  return (
    <div className="App">
      {/*<Layout></Layout>*/}
      <Routes>
        <Route path={"/"} element={<Navigate to={"/home"} />} />
        <Route path={"/home/*"} element={<Layout />}></Route>
        <Route path={"/article/:id"} element={<ArticleDetail />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile-info"} element={<ProfileInfo />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/search/result"} element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;
