import React, { useState } from 'react';
import { TreeSelect } from 'antd';

// const treeData1 = [
//     {id:1, pId:null, value:'A', title:"A"},
//     {id:2, pId:1, value:'B', title:"B"},
//     {id:3, pId:2, value:'C', title:"C"},
//     {id:4, pId:2, value:'D', title:"D"},
// ];
const TreeSelectList: React.FC<any> = (treeData) => {
    //代码存在BUG，一次请求，console.log会执行6次
    const [value, setValue] = useState<string>();
 //   console.log(treeData);
    const onChange = (newValue: string) => {
      //  console.log(newValue);
        setValue(newValue);
    };

    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            //value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDataSimpleMode
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData.treeData}
            treeLine={true}
            treeCheckable={false}
        />
    );
};

export default TreeSelectList;