import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
//测试数据
const dataSources=[{"name":"dupdb","value":"local"},{"name":"xepdb1","value":"remote"}];

const AllDependency: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                formRef.current?.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
                break;
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFill = () => {
    //    formRef.current?.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };

    return (
        <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="note" label="数据源" rules={[{required: true}]}>

                <Select
                    placeholder="配置文件对应的数据源"
                    onChange={onGenderChange}
                    allowClear>
                    <Option value="local">local</Option>
                    <Option value="remote">remote</Option>

                </Select>

            </Form.Item>


            <Form.Item name="note" label="数据源" rules={[{ required: true }]}>

               <Input/>
            </Form.Item>



            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                {/*<Button type="link" htmlType="button" onClick={onFill}>*/}
                {/*    Fill form*/}
                {/*</Button>*/}
            </Form.Item>
        </Form>
    );
};

export default AllDependency;