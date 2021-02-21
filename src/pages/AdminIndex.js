import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css';
import { Switch, Route, Link } from 'react-router-dom';
import AddBlog from './AddBlog';
import BlogList from './BlogList';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [curPage, setCurPage] = useState(null);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => { setCurPage('工作台') }}>
                        工作台
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<UserOutlined />} title="管理博客" onClick={() => { setCurPage('管理博客') }}>
                        <Menu.Item key="3">
                            <Link to='/AdminIndex/AddBlog'>添加博客</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to='/AdminIndex/BlogList'>博客列表</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', fontSize: 'large' }} ><h1>后台管理系统</h1></Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        {
                            curPage ? <Breadcrumb.Item>{curPage}</Breadcrumb.Item> : null
                        }
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Switch>
                            <Route path='/AdminIndex/AddBlog/:BlogId' component={AddBlog} />
                            <Route path='/AdminIndex/AddBlog/' component={AddBlog} />
                            <Route path='/AdminIndex/BlogList' component={BlogList} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>博客管理系统</Footer>
            </Layout>
        </Layout>
    );

}
export default AdminIndex;