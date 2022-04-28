import {configureStore} from "@reduxjs/toolkit";
import userLoginReducer from "./user.slice";
import articleReducer from "./article.slice";

export default configureStore({
    // 是否开启浏览器的 redux 开发者调试工具
    devTools: process.env.NODE_ENV !== "production",
    // 合并reducer
    reducer: {
        userLogin: userLoginReducer,
        articleManagement: articleReducer,
    }
})