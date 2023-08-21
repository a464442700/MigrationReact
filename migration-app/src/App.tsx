import React, {useState} from 'react';
import appreciateImg from './resource/赞赏码.jpg'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps,Button} from 'antd';
import {Breadcrumb, Layout, Menu, theme,Modal,Image} from 'antd';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
                <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       centered={true}
                       width={500}

                >
                    <Image
                        width={400}
                        height={400}
                        src={appreciateImg}
                    />
                </Modal>

                <Footer style={{textAlign: 'center'}}>Created by liuxiaofeng
                    <div  >
                    <a onClick={showModal}>想要请作者喝咖啡？</a>
                </div></Footer>
            </Layout>
        </Layout>
    );
};

export default App;