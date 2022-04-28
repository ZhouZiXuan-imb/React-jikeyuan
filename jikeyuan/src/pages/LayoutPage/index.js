import React, {Suspense} from 'react';
import "./index.css"

import {Layout} from 'antd';
import MenuComp from "../../components/MenuComp/MenuComp";
import HeaderContentComp from "../../components/HeaderContentComp"
import {Route, Routes} from "react-router-dom";
import DataOverview from "../DataOverview";
import ContentManagement from "../ContentManagement";
import PublishArticle from "../PublishArticle";
import Loading from "@/components/Loading";

const {Header, Sider, Content} = Layout;

function LayoutComp(props) {
    return (
        <Layout>
            <Header>
                <HeaderContentComp/>
            </Header>
            <Layout>
                <Sider>
                    <MenuComp/>
                </Sider>
                <Content>
                    <Routes path={"/home"}>
                        <Route path={"/"} element={
                            <Suspense fallback={<Loading/>}>
                                <DataOverview/>
                            </Suspense>
                        }></Route>
                        <Route path={"/content"} element={
                            <Suspense fallback={<Loading/>}>
                                <ContentManagement/>
                            </Suspense>
                        }></Route>
                        <Route path={"/article"} element={
                            <Suspense fallback={<Loading/>}>
                                <PublishArticle/>
                            </Suspense>
                        }></Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutComp;