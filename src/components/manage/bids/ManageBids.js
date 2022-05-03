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
        columnWidth: '20%',
    },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    columnWidth: '25%',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    columnWidth: '25%',
  },
  {
    title: 'Chỉnh sửa',
    dataIndex: 'edit',
    key: 'edit',
    columnWidth: "15%",
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
    columnWidth: '15%',
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
    price: 200000,
    quantity: 100,
    id: 1,
  },
  {
    key: '2',
    price: 380000,
    quantity: 200,
    id: 2,
  },
  {
    key: '3',
    price: 110000,
    quantity: 50,
    id: 3,
  },
];

export default function ManageBids() {
    return(
        <div>
            <Row>
                <span className='title-list-bids'>Danh sách gói đấu giá</span>
            </Row>
            <Row justify='end' style={{margin:"5px 0"}}>
                <Space>
                    <Button
                    type='primary'
                    icon={<AppstoreAddOutlined />}
                    >
                    Tạo gói đấu giá
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