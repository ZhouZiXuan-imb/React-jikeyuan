import React from 'react';
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";

function BreadcrumbComp(props) {
    return (
        <>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item> <NavLink to={props.to}>{props.children}</NavLink> </Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
};

export default BreadcrumbComp;