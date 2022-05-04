import { Col, Row } from "antd";
import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../FormInput.css';
import './Style.css';

function UserPassword() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Col style={{width:'100%'}}>
            <Row justify="center">
                <h1>Đổi mật khẩu</h1>
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
                    <Form.Item
                        name="old-password"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                        label="Mật khẩu"
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                        className='form-input'
                        />
                    </Form.Item>
                    <Form.Item
                        name="new-password"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                        label="Mật khẩu mới"
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu mới"
                        className='form-input'
                        />
                    </Form.Item>
                    <Form.Item
                        name="Repassword"
                        rules={[{ required: true, message: 'Hãy nhập lại mật khẩu!' }]}
                        label="Nhập lại mật khẩu mới"
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        className='form-input'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Row>
                            <button className="btn-action btn-cancel">Hủy</button>
                            <button className="btn-save btn-action ">Đổi mật khẩu</button>
                        </Row>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}

export default UserPassword;