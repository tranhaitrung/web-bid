import React from 'react';
import {Card, Col, Row} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { Link } from 'react-router-dom';

function LoginPage() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    return(
        <div>
            <Row justify="center" style={{marginTop:"5em"}} >
                <Col span={6}>
                    <Card type="inner" title="Hỗ trợ">
                        <p className='cursor'>Quên mật khẩu</p>
                        <p className='cursor'>Gửi lại mai xác nhận đăng kí tài khoản</p>
                    </Card>
                </Col>
                <Col span={1}></Col>

                <Col span={10} style={{boxShadow:'0 0.6px 1.8px rgb(0 0 0 / 10%), 0 3.2px 7.2px rgb(0 0 0 / 13%)'}} >
                    <Card title="Đăng nhập" >
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            layout='vertical'
                            >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Hãy nhập email đăng nhập!' }]}
                                label='Email'
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Email"
                                className='form-input'
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                                label='Password'
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                className='form-input'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                Quên mật khẩu
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Đăng nhập
                                </Button>
                                Hoặc <Link to="/register">Đăng ký!</Link>
                            </Form.Item>
                            </Form>
                        </div>
                        
                    </Card>
                    
                </Col>
            </Row>
            
        </div>
    );
}

export default LoginPage;