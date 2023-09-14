import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, message} from 'antd';
import type {FormInstance} from 'antd/es/form';
import axios, {AxiosResponse, AxiosError} from 'axios';
import NodeTable from './NodeTable';
import {Switch} from 'antd';
import G6 from '@antv/g6';
import {Tabs} from 'antd';
import TreeSelectList from './TreeSelectList';
import {AndroidOutlined, AppleOutlined} from '@ant-design/icons';

const {Option} = Select;
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
//测试数据
const dataSources = [{"name": "dupdb", "value": "local"}, {"name": "xepdb1", "value": "remote"}];
const baseUrl = process.env.REACT_APP_BASE_URL;

function uppercaseObjectValues(obj: Record<string, any>): Record<string, any> {
    const newObj: Record<string, any> = {};

    Object.keys(obj).forEach(key => {
        const value = obj[key];

        newObj[key] = typeof value === 'string' ? value.toUpperCase() : value;
    });

    return newObj;
}

//添加key
function addKeyToObjects(arr: any): any {
    return arr.map((obj: any, index: any) => ({
        ...obj,
        key: index
    }));
}

const AllDependency: React.FC = () => {
    const [form] = Form.useForm();
        const formRef = React.useRef<FormInstance>(null);
        const [NodesData, setNodesData] = useState<any[]>([]);
        const [loading, setLoading] = useState(false);
        const [objLoading, setobjLoading] = useState(false);
        const [queryData, setQueryData] = useState<any>();
        const [messageApi, contextHolder] = message.useMessage();
        const [treeView, setTreeView] = useState(false);
        const [treeList, setTreeList] = useState<any[]>([]);

        // const [currentTab, setCurrentTab] = useState("1");
        // const onGenderChange = (value: string) => {
        //     switch (value) {
        //         case 'male':
        //             formRef.current?.setFieldsValue({note: 'Hi, man!'});
        //             break;
        //         case 'female':
        //             formRef.current?.setFieldsValue({note: 'Hi, lady!'});
        //             break;
        //         case 'other':
        //             formRef.current?.setFieldsValue({note: 'Hi there!'});
        //             break;
        //         default:
        //             break;
        //     }
        // };


        const onReset = () => {
            formRef.current?.resetFields();
        };

        const onFill = () => {
            formRef.current?.setFieldsValue({
                dataSource: 'local',
                owner: 'SYS',
                objectType: 'TABLE',
                objectName: 'DUAL'

            });
        };

        const getObjectsList = (values: any) => {
            setobjLoading(true);
            const formData = form.getFieldsValue();
           // console.log(formData);



          let data = uppercaseObjectValues(formData);//value转换成大写
            //setQueryData(data);
            axios({
                url: `${baseUrl}getObjectsList`,
                method: 'POST',
                headers: {'content-type': 'application/json'},
                data: data,
                responseType: 'blob',
            })
                .then(function (response: AxiosResponse) {





                    const filename: string = "objectslist.cfg";

                    const downloadLink = window.URL.createObjectURL(response.data);

                    // 创建a标签，设置下载链接和下载文件名
                    const a = document.createElement('a');
                    a.href = downloadLink;
                    a.download = filename;

                    // 触发a标签的点击事件，进行下载
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    setobjLoading(false);


                })
                .catch(function (error: AxiosError) {
                console.log(error);

                    setobjLoading(false);

                });
        }
        //   const axios = require('axios');
        const onFinish = (values: any) => {
            setLoading(true);

            let data = uppercaseObjectValues(values);//value转换成大写
            setQueryData(data);
            axios({
                url: `${baseUrl}getAllDependencies`,
                method: 'POST',
                headers: {'content-type': 'application/json'},
                data: data
            })
                .then(function (response: AxiosResponse) {

                    let nodeData = addKeyToObjects(response.data);
                    setNodesData(nodeData);
                    setLoading(false);

                })
                .catch(function (error: AxiosError) {


                    setNodesData([]);
                    setLoading(false);
                    message.info("未查询到任何数据，请检查对象是否存在");

                });

            //树列表
            axios({
                url: `${baseUrl}queryTreeList`,
                method: 'POST',
                headers: {'content-type': 'application/json'},
                data: data
            })
                .then(function (response: AxiosResponse) {

                    setTreeList(response.data);


                })
                .catch(function (error: AxiosError) {


                    setTreeList([]);

                    message.info("未查询到任何数据，请检查输入对象是否存在,或者后端服务启动");

                });


            if (treeView) {


            }
        };
        const switchOnChange = () => {

            if (treeView) {
                setTreeView(false);
            } else {
                setTreeView(true);
            }
        }


        // @ts-ignore
        // @ts-ignore
        return (
            <div><Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{maxWidth: 600}}
            form={form}
            >

                {/*<Switch checkedChildren="紧凑树开启" unCheckedChildren="关闭" defaultChecked={false}*/}
                {/*      onChange={switchOnChange}/>*/}

                <Form.Item name="dataSource" label="数据源" rules={[{required: true}]}>

                    <Select
                        placeholder="application.yum文件配置的数据源"

                        allowClear>
                        <Option value="local">local</Option>
                        <Option value="remote">remote</Option>

                    </Select>

                </Form.Item>


                <Form.Item name="owner" label="对象所有者" rules={[{required: true}]}>

                    <Input placeholder="如:SYS"/>
                </Form.Item>

                <Form.Item name="objectType" label="对象类型" rules={[{required: true}]}>

                    <Input placeholder="如:TABLE"/>
                </Form.Item>


                <Form.Item name="objectName" label="对象名称" rules={[{required: true}]}>

                    <Input placeholder="如:DUAL"/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        搜索
                    </Button>

                    <Button htmlType="button" onClick={onReset}>
                        重置
                    </Button>
                    <Button htmlType="button" onClick={getObjectsList} loading={objLoading}>
                        ObjectsList
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        填充测试数据
                    </Button>
                </Form.Item>
            </Form>


                <Tabs

                    type="card"
                    items={new Array(2).fill(null).map((_, i) => {
                        const id = String(i + 1);
                        const label = id === "1" ? "节点列表" : "树选择";
                        return {
                            label: (
                                <span> {label}

                                 </span>
                            ),
                            key: id,
                            // children: <NodeTable NodesData={NodesData}/>
                            children: id === "1" ? <NodeTable NodesData={NodesData} backupFlag={false}/> :
                                <TreeSelectList treeData={treeList}/>,
                        };
                    })}
                />


            </div>
        );
    }
;

export default AllDependency;