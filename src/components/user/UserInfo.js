import { Col, Row } from "antd";
import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../FormInput.css';
import './Style.css';

function UserInfo() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Col style={{width:'100%'}}>
            <Row justify="center">
                <h1>Thông tin tài khoản</h1>
            </Row>
            <Row justify="center"  style={{display:"flex", justifyContent:"center", marginTop:"1em"}}>
                <Col>

                    <Form
                    name="normal_login"
                    className="signup-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout='vertical'
                    size='middle'
                    style={{width:'540px'}}
                    >
                    <div className="box1">
                        <div className="change-avatar">
                            <div className="left">
                                <img src="https://s3.ap-southeast-1.amazonaws.com/cleverme-production/blockchain/AVATAR/AVATAR_cake_584494726_1650685683493.jpg" alt="ảnh đại điện" />
                                <div className="box-text">
                                    <span className="title">Đổi ảnh đại điện</span>
                                    <span className="discript">Kích thước ảnh dưới 20MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Hãy nhập tên của bạn' }]}
                        label="Họ và Tên"
                    >
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Họ và Tên"
                        className='el-input'
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Hãy nhập số điện thoại' }]}
                        label="Số điện thoại"
                    >
                        <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Số điện thoại"
                        className='el-input'
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Hãy nhập email' }]}
                        label="Email"
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        className='el-input'
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Hãy nhập địa chỉ' }]}
                        label="Địa chỉ"
                    >
                        <Input prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                        placeholder="Địa chỉ" 
                        className='el-input'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Row>
                            <button className="btn-action btn-cancel">Hủy</button>
                            <button className="btn-save btn-action ">Cập nhật</button>
                        </Row>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}

export default UserInfo;