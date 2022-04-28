import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 清除浏览器默认样式
import 'normalize.css'
// 引入自定义样式
import "./index.css"
import {Provider} from "react-redux";
import store from "./store/index"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
