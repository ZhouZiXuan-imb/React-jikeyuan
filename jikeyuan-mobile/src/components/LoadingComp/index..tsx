import React from "react";
import { DotLoading } from "antd-mobile";
import "./index.scss";

function LoadingComp() {
  return (
    <div className={"loading"}>
      <DotLoading />
      加载中
    </div>
  );
}

export default LoadingComp;
