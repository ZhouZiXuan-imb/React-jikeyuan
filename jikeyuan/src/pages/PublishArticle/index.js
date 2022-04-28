import React, {useEffect} from 'react';
import {Button, Card, Form, Input, Radio, Select, Space, Upload} from "antd";
import BreadcrumbComp from "@/components/BreadcrumbComp";
import {useDispatch, useSelector} from "react-redux";
import {getChannelsList} from "@/store/article.slice";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css"
import ReactQuill from "react-quill";

function PublishArticle() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannelsList());
    },[dispatch])

    const channels = useSelector((state) => state.articleManagement.channels)

    // 富文本编辑器配置

    return (
        <>
            <Card title={<BreadcrumbComp to={"/home/article"}>发布文章</BreadcrumbComp>}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span:6 }}
                    initialValues={{
                        cover: 1,
                        article: "",
                    }}
                    autoComplete="off"
                    style={{width: "100%"}}
                >
                    <Form.Item
                        label={"标题"}
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "文章标题不能为空"
                            }
                        ]}
                    >
                        <Input placeholder={"请输入文章标题"}></Input>
                    </Form.Item>
                    <Form.Item
                        label={"频道"}
                        name={"channel"}
                        rules={[
                            {
                                required: true,
                                message: "频道不能为空"
                            }
                        ]}
                    >
                        <Select placeholder={"请选择文章频道"}>
                            {
                                channels.map(item => {
                                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"封面"}
                    >
                        <Form.Item name={"cover"}>
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>

                            </Radio.Group>
                        </Form.Item>

                    </Form.Item>
                    <Form.Item
                        label={"内容"}
                        name={"article"}
                        wrapperCol={{ span: 16 }}
                        rules={[
                            {
                                required: true,
                                message: "文章内容不能为空"
                            }
                        ]}
                    >
                        <ReactQuill placeholder={"aa"} key={1} modules={{}}></ReactQuill>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 16 ,offset: 4}}>
                        <Space>
                            <Button size={"large"} type="primary">发布文章</Button>
                            <Button size={"large"}>存入草稿</Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default PublishArticle;