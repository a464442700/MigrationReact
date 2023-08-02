import React, { useEffect, useState } from 'react';
import {Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';

interface DataType {
    key: React.Key;
    owner: string,
    objectName: string,
    objectType: string,
    database: string,
    objectID: number,
    lastDDLTime: string,
    dataSource: string,
    dependence_type: string,
    mode: string


}
interface NodeTableProps {
    NodesData: DataType[];
}



const columns: ColumnsType<DataType> = [
    {
        title: '拥有者',
        dataIndex: 'owner',
    },
    {
        title: '对象名称',
        dataIndex: 'objectName',
    },
    {
        title: '对象类型',
        dataIndex: 'objectType',
    },
    {
        title: '数据库名称',
        dataIndex: 'database',
    }, {
        title: '对象ID',
        dataIndex: 'objectID',
    }, {
        title: '最后编译时间',
        dataIndex: 'lastDDLTime',
    }, {
        title: '数据源',
        dataIndex: 'dataSource',
    }, {
        title: '依赖类型',
        dataIndex: 'dependence_type',
    }, {
        title: '模式',
        dataIndex: 'mode',
    },
];

// const dataTest: DataType[] = [];
// for (let i = 0; i < 46; i++) {
//     dataTest.push({
//         key: i,
//         owner: "APPS",
//         objectName: "CUX_TABLE_PUB",
//         objectType: "PACKAGE",
//         database: "DUPDB",
//         objectID: 77908,
//         lastDDLTime: "2023-04-13T03:01:38.000+00:00",
//         dataSource: "local",
//         dependence_type: "",
//         mode: "add",
//
//     });
// }
//const NodeTable: React.FC<NodeTableProps> = ({ NodesData }) => {

const NodeTable: React.FC<NodeTableProps> = (NodesData) => {
    console.log('NodesData:',NodesData);
    let Data = NodesData.NodesData;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    //setData(dataTest);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);

        console.log('选中selectedRowKeys:',selectedRowKeys)

    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
     //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const paginationProps = {  disabled:true };//禁止分页
    const scrollProps={y:600};//y轴滚动条
    // @ts-ignore
    return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    下载
                </Button>
                <span style={{marginLeft: 8}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={Data} pagination={paginationProps}  scroll={scrollProps}/>
        </div>
    );
};

export default NodeTable;