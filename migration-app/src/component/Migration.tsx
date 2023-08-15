import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, message} from 'antd';
import type {FormInstance} from 'antd/es/form';
import axios, {AxiosResponse, AxiosError} from 'axios';

import {Tabs} from 'antd';
import  TreeSelectList from './TreeSelectList';
import NodeTable from "./NodeTable";

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
        const formRef = React.useRef<FormInstance>(null);
        const [NodesData, setNodesData] = useState<any[]>([]);
        const [loading, setLoading] = useState(false);
        const [queryData, setQueryData] = useState<any>();
        const [messageApi, contextHolder] = message.useMessage();
        const [treeView, setTreeView] = useState(false);
        const [treeList, setTreeList] = useState<any[]>([]);




        const onReset = () => {
            formRef.current?.resetFields();
        };

        const onFill = () => {
            formRef.current?.setFieldsValue({
                dataSource: 'local',
                owner: 'APPS',
                objectType: 'PACKAGE',
                objectName: 'CUX_TEST_A',
                remoteDataSource:'remote'

            });
        };
        //   const axios = require('axios');
        const onFinish = (values: any) => {
            setLoading(true);

            let data = uppercaseObjectValues(values);//value转换成大写
            setQueryData(data);
            axios({
                url: 'http://localhost:8080/getCompareNodes',
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
                style={{maxWidth: 600}}>

                {/*<Switch checkedChildren="紧凑树开启" unCheckedChildren="关闭" defaultChecked={false}*/}
                {/*      onChange={switchOnChange}/>*/}

                <Form.Item name="dataSource" label="本地数据源" rules={[{required: true}]}>

                    <Select
                        placeholder="from"

                        allowClear>
                        <Option value="local">local</Option>
                        <Option value="remote">remote</Option>

                    </Select>

                </Form.Item>


                <Form.Item name="remoteDataSource" label="目标数据源" rules={[{required: true}]}>

                    <Select
                        placeholder="to"

                        allowClear>
                        <Option value="local">local</Option>
                        <Option value="remote">remote</Option>

                    </Select>

                </Form.Item>


                <Form.Item name="owner" label="对象所有者" rules={[{required: true}]}>

                    <Input placeholder="如:SYS" />
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
                    <Button type="link" htmlType="button" onClick={onFill}>
                        填充测试数据
                    </Button>
                </Form.Item>
            </Form>

                <NodeTable NodesData={NodesData}/>




            </div>
        );
    }
;

export default AllDependency;