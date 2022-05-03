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
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name',
    columnWidth: '50%',
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
    name: "Tổng hợp",
    id: 1,
  },
  {
    key: '2',
    name: "Điện thoại",
    id: 2,
  },
  {
    key: '3',
    name: "Laptop",
    id: 3,
  },
  {
    key: '4',
    name: "Thời trang",
    id: 4,
  },
  {
    key: '5',
    name: "Ô tô - xe máy",
    id: 5,
  },
];

export default function ManageCategory() {
    return(
        <div>
            <Row>
                <span className='title-list-bids'>Danh sách danh mục</span>
            </Row>
            <Row justify='end' style={{margin:"5px 0"}}>
                <Space>
                    <Button
                    type='primary'
                    icon={<AppstoreAddOutlined />}
                    >
                    Thêm danh mục
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