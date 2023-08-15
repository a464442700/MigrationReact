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

import AllDependency from './component/AllDependency';
import Migration from './component/Migration';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,

        children,
        label,

    } as MenuItem;
}



const items: MenuItem[] = [

    getItem('文件下载', 1, <FileOutlined/>, [
        getItem('源码下载', 2),
        getItem('对比代码下载', 3)

    ]),

];
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);//是否展开
    const [currentPageKey, setCurrentPageKey] = useState<number>(1);
    const [renderComponent,setRenderComponent]=useState();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const selectMenu = (menuItem: MenuItem | null) => {
        if (menuItem?.key) {
            // @ts-ignore
            setCurrentPageKey(menuItem.key)
           // @ts-ignore
            if (menuItem.key==2){
               // @ts-ignore
               setRenderComponent(<AllDependency/>)
           }else if (menuItem.key==3)
            { // @ts-ignore
                setRenderComponent(<Migration/>)}
        }
    };



    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}
                      onClick={selectMenu}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>

                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>

                        {renderComponent}


                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by liuxiaofeng </Footer>
            </Layout>
        </Layout>
    );
};

export default App;