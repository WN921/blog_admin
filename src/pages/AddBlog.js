import { useState, useEffect, useRef } from 'react';
import marked from 'marked';
import '../static/css/AddBlog.css';
import { baseUrl } from '../API/config';
import { Row, Col, Input, Select, Button, Card, Tag, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getLabelList, addBlog, updateBlog, getBlogById, uploadFile } from '../API/request';
const HyperMD = require("hypermd");

const { Option } = Select;
const { TextArea } = Input;

function AddBlog(props) {
    const [blogId, setBlogId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [blogInfo, setBlogInfo] = useState(null);  //待修改文章的信息
    const [blogTitle, setBlogTitle] = useState('')   //文章标题
    const [absttract, setAbstract] = useState()            //简介
    const [labelList, setLabelList] = useState([]); //选择的标签信息
    const [checkedLabelList, setCheckedLabelList] = useState([]); //选中的标签列表
    const refHyper = useRef(null);

    const saveBlog = () => {
        let blogContent = refHyper.current.getValue();
        if (!blogTitle) {
            message.error('必须输入标题');
            return false;
        }
        else if (!blogContent) {
            message.error('必须输入文章内容');
            return false;
        }
        else if (!absttract) {
            message.error('必须输入摘要');
            return false;
        }
        let params = {
            "MDStr": blogContent,
            "title": blogTitle,
            "abstract": absttract,
            'labelList': checkedLabelList
        }
        if (blogId === 0) {
            addBlog(params).then((res) => {
                if (!res) {
                    message.error('服务器没有响应');
                    return;
                }
                if (res.errno !== 0) {
                    message.error('新增博客失败')
                    return;
                }
                else {
                    setBlogId(res.data.id);
                    setBlogInfo(res.data);
                    message.success('博客保存成功')
                }
            });
        }
        else {
            params.blogId = blogId;
            params.MDFilePath = blogInfo.MDFilePath;
            updateBlog(params).then((res) => {
                if (!res) {
                    message.error('服务器没有响应');
                    return;
                }
                if (res.errno !== 0) {
                    message.error('更新博客失败')
                    return;
                }
                else {
                    setBlogId(res.data.id);
                    setBlogInfo(res.data);
                    message.success('博客更新成功')
                }
            })

        }

    }
    const getBlog = (id) => {
        getBlogById(id).then(res => {
            if (!res) {
                message.error('服务器没有响应');
                return;
            }
            if (res.errno !== 0) {
                message.error('获取指定博客失败')
                return;
            }

            setBlogId(id);
            setBlogInfo(res.data)
            setBlogTitle(res.data.title);
            refHyper.current.setValue(res.data.content)
            console.log(refHyper.current);
            console.log(res.data.content)
            setAbstract(res.data.abstract);
            setCheckedLabelList(res.data.labels.map(item => (item.id)))
        })
    }
    useEffect(() => {
        getLabelList().then((res) => {
            if (!res) {
                message.error('服务器没有响应');
                return;
            }
            if (res.errno !== 0) {
                console.error('获取标签列表失败')
                return;
            }
            else {
                setLabelList(res.data);
            }
        })
    }, [])
    useEffect(() => {
        const myTextarea = document.getElementById("TextForHyperMD")
        let cm = HyperMD.fromTextArea(myTextarea, {
            /* optional editor options here */
            hmdModeLoader: false, // see NOTEs below
        })
        refHyper.current = cm;
    }, [])
    useEffect(() => {
        let BlogId = props.match.params.BlogId;
        if (!BlogId) {
            return;
        }
        else {
            getBlog(BlogId);
        }
    }, [props.match.params.BlogId])

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} className="AddBlog-TitleRow">
                        <Col span={16}>
                            <Input placeholder='博客标题'
                                value={blogTitle}
                                size='large'
                                onChange={(e) => {
                                    setBlogTitle(e.target.value);
                                }}
                            />
                        </Col>
                        <Col span={8} className='AddBlog-Upload'>
                            <Input placeholder="Basic usage" type='file' onChange={e => {
                                uploadFile(e.target.files[0]).then(res => {
                                    if (!res) {
                                        message.error('服务器没有响应');
                                        return;
                                    }
                                    if (res.errno !== 0) {
                                        console.error('上传图片失败')
                                        return;
                                    }
                                    else {
                                        message.success(baseUrl + res.data.path, 10);
                                    }
                                })
                            }} />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24} >
                            <TextArea
                                id='TextForHyperMD'
                                rows={35}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24} className='AddBlog-Button'>
                            <Button size='large'>暂存文章</Button>
                            <Button size='large' type='primary' onClick={saveBlog}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                value={absttract}
                                onChange={(e) => {
                                    setAbstract(e.target.value)
                                }}
                                rows={10}
                                placeholder='文章简介'
                            />
                        </Col>
                    </Row>
                    <Card className='AddBlog-Card'>
                        <Checkbox.Group
                            value={checkedLabelList}
                            style={{ width: '100%' }}
                            onChange={(checkedValue) => {
                                setCheckedLabelList(checkedValue);
                            }}>
                            {
                                labelList.map((item) => (
                                    <Checkbox value={item.id} key={item.id}>
                                        <Tag color={item.color}>
                                            {item.labelName}
                                        </Tag>
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AddBlog;