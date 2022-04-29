import React from 'react';
import "./login.css"
// antd组件
import { message, Button, Card, Checkbox, Form, Input} from "antd";
// import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {loginApi} from "@/api/loginApi";
import {setLocalStorageToken} from "@/utils/localStorageFn";

function Login(props) {
    // 使用dispatch
    // const dispatch = useDispatch()
    // 跳转路由
    const navigate = useNavigate();

    async function onSubmit(values) {
        // 发起请求
        // 整理请求参数
        let loginPayload = {
            mobile: values.mobile,
            code: values.code
        }
        let {data: {token}} = await loginApi({...loginPayload})

        // token存储到本地
        setLocalStorageToken(token);

        // 跳转路由
        navigate("/home")
        // 提示登陆成功
        message.success("登录成功")
    }

    // 声明校验规则
    let formMobileRules = [
        {
            required: true,
            message: "手机号不能为空"
        },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: "请检查手机号格式"
        }
    ]

    return (
        <div className={"login_root"}>
            <Card>
                <img src="/logo.png" alt="logo"/>
                <Form onFinish={onSubmit} initialValues={{
                    mobile: "13911111111",
                    code: "246810",
                    isAgree: true,
                }}>
                    <Form.Item name={"mobile"} rules={formMobileRules}>
                        <Input size="large" placeholder="请输入手机号" maxLength={11}/>
                    </Form.Item>
                    <Form.Item name={"code"}>
                        <Input size="large" placeholder="请输入验证码" maxLength={6}/>

                    </Form.Item>

                    <Form.Item name={"isAgree"} valuePropName={"checked"}>
                        <Checkbox>
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button block htmlType={"submit"} type={"primary"} size={"large"}>登录</Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
}

export default Login;