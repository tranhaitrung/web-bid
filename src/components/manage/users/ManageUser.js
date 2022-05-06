import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Row, Button, Col, Input } from 'antd';
import {SearchOutlined, AppstoreAddOutlined} from '@ant-design/icons';

import '../users/ManageUser.css';

const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '25%',
    },
  {
    title: 'Tên Thành Viên',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '10%',
  },
  {
    title: 'Chi tiết',
    dataIndex: 'id',
    key: 'id',
    width: '15%',
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
    width: '25%',
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
            <Row justify='space-between' style={{margin:"5px 0"}}>
                <Col span={7} >
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
                <Col span={7}>
                  <Row justify='end'>
                    <Space>
                          <Button
                          type='primary'
                          icon={<AppstoreAddOutlined />}
                          >
                          Thêm thành viên
                          </Button>
                      </Space>
                  </Row>
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