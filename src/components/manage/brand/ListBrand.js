import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Row, Button, Col, Input } from 'antd';
import {SearchOutlined, AppstoreAddOutlined} from '@ant-design/icons';

import '../bids/ManageBids.css';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
    },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name',
    width: '50%',
  },
  {
    title: 'Chỉnh sửa',
    dataIndex: 'edit',
    key: 'edit',
    width: "15%",
    render: (text, record) => (
        <span onClick={()=> console.log(record)} className="button-edit cursor">
          {"Chỉnh sửa"}
        </span>
    ),
  },
  {
    title: 'Xóa',
    key: 'delete',
    dataIndex: 'delete',
    width: '15%',
    render: (text, record) => (
        <button onClick={()=> console.log(record)} className={"button-delete cursor"}>
        {"Xóa"}
      </button>
    ),
  },
];

const data = [
  {
    key: '1',
    name: "Chanel",
    id: 1,
  },
  {
    key: '2',
    name: "Apple",
    id: 2,
  },
  {
    key: '3',
    name: "Samsung",
    id: 3,
  },
  {
    key: '4',
    name: "Mazda",
    id: 4,
  },
  {
    key: '5',
    name: "Honda",
    id: 5,
  },
];


class ListBrand extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
            <Row>
                <span className='title-list-bids'>Danh sách thương hiệu</span>
            </Row>
            <Row justify='end' style={{margin:"5px 0"}}>
                <Space>
                    <Button
                    type='primary'
                    icon={<AppstoreAddOutlined />}
                    >
                    Thêm thương hiệu
                    </Button>
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                <Table columns={columns} dataSource={data} />
                </Col>
                
            </Row>
        </div>
        );
    }
}

export default ListBrand;