import React from 'react';

import {Menu} from 'antd';
import {EditOutlined, DiffOutlined, HomeOutlined,} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('数据概览', '/home', <HomeOutlined />),
    getItem('内容管理', '/home/content', <DiffOutlined />),
    getItem('发布文章', '/home/article', <EditOutlined />),
];

function MenuComp(props) {
    const navigate = useNavigate()
    // 获取当前location对象
    const location = useLocation()
    // 点击侧边栏选项
    function handlerNavigate({key}) {
        navigate(key)
    }
    return (
        <>
            <Menu
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
                onClick={handlerNavigate}
            />
        </>
    );
}

export default MenuComp;