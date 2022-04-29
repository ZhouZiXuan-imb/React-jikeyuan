import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Form, Input, message, Radio, Select, Space, Upload} from "antd";
import BreadcrumbComp from "@/components/BreadcrumbComp";
import {useDispatch, useSelector} from "react-redux";
import {getChannelsList} from "@/store/article.slice";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css"
import ReactQuill from "react-quill";

import {PlusOutlined} from '@ant-design/icons';
import {editArticle, getArticle, publishArticle} from "@/api/contentApi";
import {useLocation, useNavigate} from "react-router";
import {useForm} from "antd/es/form/Form";

function PublishArticle() {
    const params = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannelsList());
    }, [dispatch])

    const channels = useSelector((state) => state.articleManagement.channels)

    // 当上传图片后
    const [fileList, setFileList] = useState([]);
    const fileListRef = useRef([]);

    function onUploadChange(info) {
        if (info.fileList.length > coverType) return false;
        let newFileList = info.fileList.map(file => {
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file
        })

        fileListRef.current.fileList = newFileList

        setFileList(newFileList)
    }

    // 富文本编辑器配置
    // 存储form表单数据
    const [coverType, setCoverType] = useState(1);

    function handleChangeCover(e) {
        let cover = e.target.value
        setCoverType(cover)
        if (cover === 1) {
            setFileList([fileListRef.current.fileList[0]])
        } else if (cover === 3) {
            setFileList(fileListRef.current.fileList)
        }
    }

    // 发表文章
    // 存储发表文章参数
    let reqParams = {};
    const navigate = useNavigate();

    async function onSubmit({title,content, channel_id}, draftType, text) {
        if(!params.state?.id) {
            let newFileList = fileList.map(item => item.url)
            if (fileList.length === coverType) {
                // 整合参数
                reqParams = {
                    title,
                    content,
                    channel_id,
                    cover: {
                        type: coverType,
                        images: newFileList
                    }
                }

                await publishArticle({data: reqParams, draftType})
                message.success(text || "文章发表成功")
                navigate("/home/content")
            } else {
                return message.error("请按照封面类型传递封面图片")
            }
        } else {
            handleEditArticle(draftType, text);
        }
    }

    const [form] = useForm();

    // 是否是草稿
    async function onDraft(draftType) {
        let values = await form.validateFields();
        console.log(values)
        onSubmit(values, draftType, "存入草稿成功")
    }

    useEffect(() => {
        async function setFormData() {
            if (params.state?.id) {
                let {data: {channel_id, content, cover: {type, images}, title}} = await getArticle(params.state?.id);
                form.setFieldsValue({
                    type,
                    channel_id: channel_id,
                    content: content,
                    title
                })
                let newFileList = images.map(item => ({url: item}))
                fileListRef.current.fileList = newFileList
                setCoverType(type)
                setFileList(newFileList);
            }
        }

        setFormData();
    }, [form, params.state?.id])

   async function handleEditArticle(draftType, text) {
        // 获取文章id，整合表单values
        let {type, channel_id, content, title} = form.getFieldsValue(true);
        setCoverType(type);

        let newFileList = fileList.map(item => item.url);
        reqParams = {
            channel_id,
            content,
            title,
            cover: {
                type,
                images: newFileList
            }
        }

        await editArticle({id: params.state.id, data: reqParams, draftType})
        message.success(text || "文章发表成功")
        navigate("/home")
    }

    return (
        <>
            <Card title={<BreadcrumbComp to={"/home/article"}>发布文章</BreadcrumbComp>}>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 7}}
                    initialValues={{
                        content: "",
                    }}
                    autoComplete="off"
                    style={{width: "100%"}}
                    onFinish={(values) => onSubmit(values)}
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
                        name={"channel_id"}
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
                        <Form.Item>
                            <Radio.Group value={coverType} onChange={handleChangeCover}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            coverType > 0 ? <Upload
                                    name="image"
                                    listType="picture-card"
                                    action="http://geek.itheima.net/v1_0/upload"
                                    fileList={fileList}
                                    onChange={onUploadChange}
                                >

                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
                                    </div>


                                </Upload>
                                :
                                ""
                        }
                    </Form.Item>
                    <Form.Item
                        label={"内容"}
                        name={"content"}
                        wrapperCol={{span: 16}}
                        rules={[
                            {
                                required: true,
                                message: "文章内容不能为空"
                            }
                        ]}
                    >
                        <ReactQuill placeholder={"aa"} key={1}></ReactQuill>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 16, offset: 4}}>
                        <Space>
                            <Button size={"large"} type="primary" htmlType={"submit"}>发布文章</Button>
                            <Button size={"large"} onClick={() => onDraft(true)}>存入草稿</Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default PublishArticle;