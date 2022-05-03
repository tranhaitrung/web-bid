import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Row, Button, Col, Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';

import '../users/ManageUser.css';

const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        columnWidth: '25%',
    },
  {
    title: 'Tên Thành Viên',
    dataIndex: 'name',
    key: 'name',
    columnWidth: '25%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    columnWidth: '10%',
  },
  {
    title: 'Chi tiết',
    dataIndex: 'id',
    key: 'id',
    columnWidth: '15%',
    render: (text, record) => (
        <span onClick={()=> console.log(record)} className="text-hyperlink cursor text-view-detail">
          {"Xem chi tiết"}
        </span>
    ),
  },
  {
    title: 'Khóa/Mở Khóa Tài Khoản',
    key: 'status',
    dataIndex: 'status',
    columnWidth: '25%',
    render: (text, record) => (
        <button onClick={()=> console.log(record)} className={record.status === 'ACTIVE' ? "button-active cursor" : "button-block cursor"}>
        {record.status === 'ACTIVE' ? "Khóa tài khoản" : "Mở khóa tài khoản"}
      </button>
    ),
  },
];

const data = [
  {
    key: '1',
    username: 'kohnbrown@gmail.com',
    name: 'John Brown',
    age: 32,
    id: 1,
    status: 'BLOCK',
  },
  {
    key: '2',
    username: 'toan.nk@gmail.com',
    name: 'Nguyễn Khánh Toàn',
    age: 26,
    id: 2,
    status: 'ACTIVE',
  },
  {
    key: '3',
    username: 'anh.nt@gmail.com',
    name: 'Nguyễn Tiến Anh',
    age: 36,
    id: 3,
    status: 'ACTIVE',
  },
  {
    key: '4',
    username: 'nam.nv@gmail.com',
    name: 'Nguyễn Văn Nam',
    age: 22,
    id: 4,
    status: 'ACTIVE',
  },
];

export default function ManageUser() {
    return(
        <div>
            <Row>
                <span className='title-list-user'>Danh sách thành viên</span>
            </Row>
            <Row>
                <Col span={7} style={{margin:"5px 0"}}>
                <Space>
                    <Input placeholder='Tìm kiếm tên đấu giá' style={{width: "290px"}}/>
                    <Button
                    type='primary'
                    icon={<SearchOutlined />}
                    >
                    Tìm kiếm
                    </Button>
                </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Table columns={columns} dataSource={data} />
                </Col>
                
            </Row>
        </div>
    );
}