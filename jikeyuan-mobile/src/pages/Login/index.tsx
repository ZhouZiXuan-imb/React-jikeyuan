import React, { useState } from "react";
import { Button, Form, Input, NavBar } from "antd-mobile";
import { useNavigate } from "react-router";
import "./index.scss";
import { getLoginCode, login } from "@/api/loginApi";
import {
  LoginCodeResponse,
  LoginRequestParams,
  LoginResponse,
} from "@/types/login";
import { setToken } from "@/utils/token";

function Login() {
  const navigate = useNavigate();
  function back() {
    navigate("/home");
  }

  let [form] = Form.useForm();

  async function onFinish({ mobile, code }: LoginRequestParams) {
    let {
      data: { token, refresh_token },
    } = await login<LoginResponse>({ mobile, code });

    if (token) {
      // 获取到token直接存到本地
      setToken({ token, refresh_token });

      // 跳转路由到
      navigate(-1);
    }
  }

  // 声明校验规则
  let formMobileRules = [
    {
      required: true,
      message: "手机号不能为空",
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请检查手机号格式",
    },
  ];

  // 倒计时
  const [timekeeping, setTimekeeping] = useState(60);

  // 初始化定时器
  let timer = 0;

  let [timerStart, setTimerStart] = useState(false);

  // 发送验证码
  async function handleSendCode() {
    try {
      let { mobile } = await form.validateFields(["mobile"]);
      if (mobile) {
        // 发起请求获取验证码
        let code = await getLoginCode<LoginCodeResponse>({ mobile });
        if (code.data === null) {
          setTimerStart(true);
          timer = window.setInterval(() => {
            // 开启定时器
            setTimekeeping((timekeeping) => {
              if (timekeeping === 0) {
                clearInterval(timer);
                setTimerStart(false);
                return 60;
              }
              return --timekeeping;
            });
            // console.log(timekeeping);
          }, 1000);
        }
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <>
      <NavBar onBack={back} />
      <div className="wrapper">
        <h1 className="">短信登录</h1>

        <div className="form">
          <Form form={form} layout="horizontal" onFinish={onFinish}>
            <Form.Item name={"mobile"} rules={formMobileRules}>
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name={"code"}
              extra={
                timerStart ? (
                  <span>{`${timekeeping}秒后获取`}</span>
                ) : (
                  <span onClick={handleSendCode} style={{ fontSize: 14 }}>
                    发送验证码
                  </span>
                )
              }
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item>
              <Button
                className="login-button"
                type={"submit"}
                block
                color="primary"
                size="large"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
