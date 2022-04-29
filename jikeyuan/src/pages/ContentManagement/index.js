import React, {useEffect} from 'react';
import "./index.css"
import {Button, Card, DatePicker, Form, Image, message, Modal, Radio, Select, Space, Table, Tag} from "antd";
import BreadcrumbComp from "../../components/BreadcrumbComp"
import {useDispatch, useSelector} from "react-redux";
import {getArticleList, getChannelsList} from "../../store/article.slice";
import moment from 'moment';
import {imgSrc} from "@/assets/images/defaultCover";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {delArticle} from "@/api/contentApi";
import {useNavigate} from "react-router";

// 日期选择器
const {RangePicker} = DatePicker;

function ContentManagement() {
    const dispatch = useDispatch();
    let channelsData = useSelector((state) => state.articleManagement.channels)

    let reqParams = {};

    // 点击筛选按钮
    function onSubmit(values) {
        reqParams.status = values.status;
        reqParams.channel_id = values.channel_id
        if (values.date) {
            reqParams.begin_pubdate = moment(values.date[0]).format('YYYY-MM-DD');
            reqParams.end_pubdate = moment(values.date[0]).format('YYYY-MM-DD');
        } else {
            reqParams.begin_pubdate = undefined;
            reqParams.end_pubdate = undefined;
        }

        dispatch(getArticleList(reqParams))
    }

    const radioData = [
        {
            value: 0,
            name: "草稿"
        },
        {
            value: 1,
            name: "待审核",
        },
        {
            value: 2,
            name: "审核未通过"
        },
        {
            value: 3,
            name: "审核失败"
        }
    ]

    // 获取所有频道列表
    useEffect(() => {
        dispatch(getChannelsList());

        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        dispatch(getArticleList(reqParams))
        // eslint-disable-next-line
    },[dispatch])

    // Table组件
    // 表格状态数据
    const statusLabel = [
        {text: "草稿", color: "default"},
        {text: "待审核", color: "blue"},
        {text: "审核通过", color: "green"},
        {text: "审核拒绝", color: "red"},
    ];

    const navigate = useNavigate();
    // 表头数据
    const columns = [
        {
            title: "封面",
            dataIndex: "cover",
            key: "cover",
            render(cover) {
                console.log(cover)
                return <Image preview={false} src={cover.images[0] ? cover.images[0] : imgSrc} width={200}
                              height={150}/>
            }
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render(status) {
                return <Tag {...statusLabel[status]}>{statusLabel[status].text}</Tag>
            }
        },
        {
            title: "发布时间",
            dataIndex: "pubdate",
            key: "pubdate",
        },
        {
            title: "阅读数",
            dataIndex: "read_count",
            key: "read_count",
        },
        {
            title: "评论数",
            dataIndex: "comment_count",
            key: "comment_count",
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
            key: "like_count",
        },
        {
            title: "操作",
            key: "action",
            render(article) {
                let isLoading = false;

                function confirm() {
                    Modal.confirm({
                        title: '温馨提示',
                        icon: <ExclamationCircleOutlined/>,
                        content: '此操作将永久删除该文章, 是否继续？',
                        okText: '确认',
                        cancelText: '取消',
                        confirmLoading: isLoading,
                        onOk: () => handleOk(article.id),
                        onCancel: handleCancel,
                    });

                    async function handleOk(id) {
                        isLoading = true;
                        await delArticle(id);
                        isLoading = false;
                        // 删除完成后重新加载文章列表
                        dispatch(getArticleList(reqParams))
                        message.success("操作成功")
                    }

                    function handleCancel() {
                        return false;
                    }
                }

                function handleEditArticle() {
                    navigate(`/home/article`, {
                        state: {id: article.id}
                    })
                }

                return <Space>
                    <Button type="primary" shape="circle" onClick={() => handleEditArticle()}>
                        <EditOutlined/>
                    </Button>
                    <Button type="primary" shape="circle" danger onClick={confirm}>
                        <DeleteOutlined/>
                    </Button>
                </Space>
            }
        },
    ];
    // 表格数据
    let articleList = useSelector((state) => state.articleManagement.articles)

    // 获取表格分页数据
    let {page, per_page, total_count} = useSelector((state) => state.articleManagement)

    function handleChangePage(page, pageSize) {
        reqParams.page = page;
        reqParams.per_page = pageSize;
        dispatch(getArticleList(reqParams))
    }

    return (
        <>
            <Card title={<BreadcrumbComp to={"/home/content"}> 内容管理 </BreadcrumbComp>} bordered={false}
                  style={{width: "auto"}}>
                <Form onFinish={onSubmit}>
                    <Form.Item
                        label={"状态"}
                        name={"status"}
                    >
                        <Radio.Group style={{width: 500}}>
                            <Radio value={undefined}>全部</Radio>
                            {
                                radioData.map((item) => (
                                    <Radio key={item.value} value={item.value}>{item.name}</Radio>))
                            }
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label={"频道"}
                        name={"channel_id"}
                    >
                        <Select placeholder={"请选择文章频道"} style={{width: 264}}>
                            {
                                channelsData.map(item => (
                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"日期"}
                        name={"date"}
                    >
                        <RangePicker placeholder={["开始日期", "结束日期"]}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type={"primary"} htmlType={"submit"}>筛选</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card>
                <Table columns={columns} dataSource={articleList} position={["bottomCenter"]}
                       pagination={{
                           position: ["bottomCenter"],
                           pageSizeOptions: [5, 10, 15, 20, 25, 30],
                           pageSize: per_page,
                           total: total_count,
                           current: page,
                           onChange: handleChangePage
                       }}
                />
            </Card>
        </>
    );
}

export default ContentManagement;