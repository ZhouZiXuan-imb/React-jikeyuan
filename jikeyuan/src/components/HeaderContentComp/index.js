import React from 'react';

import "./index.css"

import {LoginOutlined} from '@ant-design/icons';
// import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {removeLocalStorageToken} from "@/utils/localStorageFn";
import {Popconfirm} from "antd";

function HandlerContentComp(props) {
    // const dispatch = useDispatch();
    const navigate = useNavigate()

    // 退出登录
    function logout() {
        removeLocalStorageToken();

        navigate("/login");
    }

    function confirm(e) {
        logout();
    }

    function cancel(e) {
        return false;
    }

    return (
        <>
            <div className={"logo"}></div>

            <div className={"user-info"}>
                <span className={"user-name"}>黑马先锋</span>
                <span className={"user-logout"}>
                    <span>
                        <LoginOutlined/>
                          <Popconfirm
                              title="是否确认退出？"
                              onConfirm={confirm}
                              onCancel={cancel}
                              okText="退出"
                              cancelText="取消"
                          >
                            退出
                          </Popconfirm>
                    </span>
                </span>
            </div>
        </>
    );
}

export default HandlerContentComp;