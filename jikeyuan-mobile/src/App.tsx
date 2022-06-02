import React from "react";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import { Navigate, Route, Routes } from "react-router";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "@/pages/Login";

function App() {
  return (
    <div className="App">
      {/*<Layout></Layout>*/}
      <Routes>
        <Route path={"/"} element={<Navigate to={"/home"} />} />
        <Route path={"/home/*"} element={<Layout />}></Route>
        <Route path={"/article/:id"} element={<ArticleDetail />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
