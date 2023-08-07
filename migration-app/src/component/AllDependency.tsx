import React, { useEffect, useState } from 'react';
import {Button, Form, Input, Select} from 'antd';
import type {FormInstance} from 'antd/es/form';
import axios, {AxiosResponse, AxiosError} from 'axios';
import NodeTable from './NodeTable';

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
function addKeyToObjects(arr:any):any{
    return arr.map((obj:any, index:any) => ({
        ...obj,
        key: index
    }));
}

const AllDependency: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const [NodesData, setNodesData] = useState<any[]>([]);
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
    //   const axios = require('axios');
    const onFinish = (values: any) => {

        console.log('获取节点请求入参',values);
        let data = uppercaseObjectValues(values);//value转换成大写

        axios({
            url: 'http://localhost:8080/getAllDependencies',
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: data
        })
            .then(function (response: AxiosResponse) {
                console.log('response',response);
               let nodeData=addKeyToObjects(response.data);
                setNodesData(nodeData);

            })
            .catch(function (error: AxiosError) {
                setNodesData([]);
                console.log(error);
            });
    };

    // @ts-ignore
    // @ts-ignore
    return (
       <div> <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{maxWidth: 600}}
        >
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
                <Button type="primary" htmlType="submit">
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
  <NodeTable NodesData={NodesData} />

       </div>
    );
};

export default AllDependency;