import React, {useState} from 'react';

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    labalCode:string,
    icon?: React.ReactNode,
    children?: MenuItem[],

): MenuItem {
    return {
        key,
        icon,
        labalCode,
        children,
        label,

    } as MenuItem;
}
function selectMenu(menuItem:MenuItem| null){
    if (menuItem?.key) {
        console.log(menuItem.key);
    }
}

const items: MenuItem[] = [

    getItem('文件下载', 1,'downloadFile', <FileOutlined/>, [
        getItem('源码下载', 2,'oneSource'),
        getItem('对比代码下载', 3,'compareSource')

    ]),

];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={selectMenu}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by liuxiaofeng </Footer>
            </Layout>
        </Layout>
    );
};

export default App;