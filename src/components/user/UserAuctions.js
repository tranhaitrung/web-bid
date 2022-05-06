import { Col, Row } from "antd";
import React from "react";
import { Form, Input, Button, Checkbox, Cascader, DatePicker } from 'antd';
import { UserOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import '../FormInput.css';
import './Style.css';

const {RangePicker} = DatePicker;

function UserAuctions() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const listCategory = [
        {         
            value: '0',
            label: 'Laptop',
        },
        {         
            value: '2',
            label: 'Túi xách',
        },
        {         
            value: '3',
            label: 'Oto',
        },
    ]

    function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }

    return (
        <Col style={{width:'100%'}}>
            <Row justify="center">
                <h1>Tạo cuộc đấu giá</h1>
            </Row>
            <Row justify="center"  style={{display:"flex", justifyContent:"center", marginTop:"1em"}}>
                <Col>
                    <Form
                    name="create_auction_form"
                    className="signup-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout='vertical'
                    size='middle'
                    style={{width:'540px'}}
                    >
                    <Form.Item
                        name="auction_name"
                        rules={[{ required: true, message: 'Hãy nhập tên đấu giá' }]}
                        label="Tên đấu giá"
                    >
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Họ và Tên"
                        className='el-input'
                        size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Danh mục"
                    >
                        <Cascader size="large" options={listCategory} onChange={(key)=>{console.log(key)}} placeholder="Chọn danh mục" />
                    </Form.Item>
                    <Row justify="space-between">
                        <Form.Item
                            name="startAt"
                            label="Bắt đầu"
                            style={{width:"45%"}}
                        >
                            <DatePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onChange}
                            style={{width:'100%'}}
                            size='large'
                            placeholder="Start time"
                            />
                        </Form.Item>
                        <Form.Item
                            name="endAt"
                            label="Kết thúc"
                            style={{width:"45%"}}
                        >
                            <DatePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            size='large'
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onChange}
                            style={{width:'100%'}}
                            placeholder="End time"
                            />
                        </Form.Item>

                    </Row>

                    <Form.Item style={{marginTop:'20px'}}>
                        <Row>
                            <button className="btn-action btn-cancel">Hủy</button>
                            <button className="btn-save btn-action ">Tạo mới</button>
                        </Row>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}

export default UserAuctions;