import React from 'react'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';

function TabBarComp(props) {
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: 'todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: 'message',
            title: '我的消息',
            icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
        },
        {
            key: 'personalCenter',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ]

    return (
        <>
            <TabBar>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </>
    );
}

export default TabBarComp;