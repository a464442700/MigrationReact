import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import axios, {AxiosResponse, AxiosError} from 'axios';

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
    mode: string,
    level: number


}

interface NodeTableProps {
    NodesData: DataType[],
    backupFlag:boolean;
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
        width: 300,
    }, {
        title: '数据源',
        dataIndex: 'dataSource',
    }, {
        title: '依赖类型',
        dataIndex: 'dependence_type',
    }, {
        title: '模式',
        dataIndex: 'mode',
    }, {
        title: '层级',
        dataIndex: 'level',
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
const baseUrl=process.env.REACT_APP_BASE_URL;
const NodeTable: React.FC<NodeTableProps> = ({NodesData,backupFlag}) => {
//    console.log('backupFlag:',backupFlag,NodesData);
    let Data = NodesData;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const end = () => {
        setLoading(false);
    }
    //setData(dataTest);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        console.log(selectedRowKeys);

        // console.log('选中selectedRowKeys:', selectedRowKeys);
        // const requestNodes = selectedRowKeys.filter((item, index) => {
        //         return Data[index]
        //     }
        // );

        const requestNodes=selectedRowKeys.map((item,index)=>Data[Number(item)]);
        console.log("请求报文：", requestNodes, backupFlag);
        //console.log('选中selectedRowKeys对应的数据:',requestNodes);
        axios({
            url: `${baseUrl}downloadFileByNodes`,
            method: 'POST',
            data: requestNodes,
            responseType: 'blob',
            headers: {
                backupFlag:backupFlag
            }
        })
            .then(function (response) {
                //console.log(response.headers);
                let contentDisposition = response.headers['content-disposition'];


                const filename: string = contentDisposition.substring(contentDisposition.indexOf("filename=") + "filename=".length);

                console.log(filename);
                const downloadLink = window.URL.createObjectURL(response.data);

                // 创建a标签，设置下载链接和下载文件名
                const a = document.createElement('a');
                a.href = downloadLink;
                a.download = filename;

                // 触发a标签的点击事件，进行下载
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                setLoading(false);


            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });


    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        //    console.log(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const paginationProps = {disabled: true};//禁止分页
    const scrollProps = {y: 600};//y轴滚动条
    // @ts-ignore
    return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    源码下载
                </Button>
                {loading ? (
                    <Button onClick={end}>
                        终止
                    </Button>
                ) : null
                }
                <span style={{marginLeft: 8}}>   {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} </span>

            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={Data} pagination={paginationProps}
                   scroll={scrollProps}/>
        </div>
    );
};

export default NodeTable;