import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button, Table, Tag, Space } from 'antd';
import { getBlogList, deleteBlog } from '../API/request';
import { Link } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';

const { confirm } = Modal;


function BlogList(props) {
    const [list, setList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const refreshPage = () => {
        getBlogList(
            localStorage.getItem('userId'),
            pageNumber,
            pageSize
        ).then(res => {
            console.log(res);
            if (!res) {
                message.error('服务器未响应');
                return false;
            }
            if (res.errno !== 0) {
                message.error('获取博客列表失败');
                return false;
            }
            setBlogList(res.data);
        })
    }
    useEffect(() => {
        refreshPage();
    }, [])

    const delBlog = (id) => {
        confirm({
            title: '确定要删除这篇博客吗？',
            Content: '点击OK则永久删除文章',
            onOk() {
                deleteBlog(id).then(res => {
                    if (!res) {
                        message.error('服务器未响应');
                        return false;
                    }
                    if (res.errno !== 0) {
                        message.error('删除失败');
                        return false;
                    }
                    refreshPage();
                    message.success('删除成功');
                })
            },
            onCancel() {
                message.success('文章没有任何变化');
            }
        })
    }
    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'updatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: 'labels',
            key: 'labels',
            dataIndex: 'labels',
            render: labels => (
                <>
                    {labels.map(label => {
                        return (
                            <Tag color={label.color} key={label.labelName}>
                                {label.labelName}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button><Link to={`/AdminIndex/AddBlog/${record.id}`}>修改</Link></Button>
                    <Button onClick={() => {
                        delBlog(record.id);
                    }}>删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={blogList} />
        </>
    )
}

export default BlogList;