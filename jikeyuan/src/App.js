import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Navigate} from "react-router";
import Loading from "@/components/Loading";

moment.locale('zh-cn')

const AuthGuard = lazy(() => import("@/common/AuthGuard"));
const Login = lazy(() => import("@/pages/LoginPage"))
const LayoutComp = lazy(() => import("@/pages/LayoutPage"))

function App(props) {
    return (
        <>
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"/home"}/>}></Route>
                        <Route path={"/home/*"} element={
                            <Suspense fallback={<Loading/>}>
                                <AuthGuard><LayoutComp/></AuthGuard>
                            </Suspense>
                        }/>
                        <Route path={"login"} element={
                            <Suspense fallback={<Loading/>}>
                                <Login/>
                            </Suspense>
                        }/>
                    </Routes>
                </BrowserRouter>
            </ConfigProvider>
        </>
    );
}

export default App;