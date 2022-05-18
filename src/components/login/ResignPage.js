import React, {useState} from 'react';
import {Card, Col, Row} from 'antd';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import './Sigup.css'
import { Link } from 'react-router-dom';
import apis from '../../redux/apis';
function ResignPage() {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const onFinish = (values) => {
        var firstName = values.firstName;
        var lastName = values.lastName;
        var phone = values.phone;
        var email = values.email;
        var password = values.password;
        var rePass = values.Repassword;
        var name = firstName + " "+lastName;
        if(password != rePass) {
            message.error("Mật khẩu không khớp");
            return;
        }

        setIsLoading(true);

        var body = {
            email: email,
            password: password,
            re_pass: rePass,
            name: name,
            phone: phone
        }

        apis.auth
            .signUp(body)
            .then(res => {
                if (res.data.code === 1000 ) {
                    message.success("Đăng ký tài khoản thành công");
                    setIsLoading(false);
                    history.push("/login")
                } else {
                    message.error("Đăng ký thất bại")
                    setIsLoading(false);
                }
            })
            .catch(err => {
                message.error("Đăng ký thất bại")
                setIsLoading(false);
            })
    };
    return(
        <div>
            <Row style={{display:"flex", justifyContent:"center", marginTop:"4em"}}>
                <Col span={8} style={{padding:"30px 30px", boxShadow:'0 0.6px 1.8px rgb(0 0 0 / 10%), 0 3.2px 7.2px rgb(0 0 0 / 13%)', borderRadius: "7px"}}>
                <Row style={{display:"flex", justifyContent:"center", marginBottom:"10px"}}><b><h1>Đăng Ký</h1></b></Row>
                <Form
                name="normal_login"
                className="signup-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout='vertical'
                size='middle'
                >
                <Row justify='space-between'>
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Hãy nhập Họ' }]}
                        label="Họ"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Họ" 
                        className='form-input'/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Hãy nhập tên' }]}
                        label="Tên"
                    >
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Tên"
                        className='form-input'
                        />
                    </Form.Item>
                </Row>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại' }]}
                    label="Số điện thoại"
                >
                    <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Số điện thoại"
                    className='form-input'
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập email' }]}
                    label="Email"
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} 
                    placeholder="Email" 
                    className='form-input'
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                    label="Mật khẩu"
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    className='form-input'
                    />
                </Form.Item>
                <Form.Item
                    name="Repassword"
                    rules={[{ required: true, message: 'Hãy nhập lại mật khẩu!' }]}
                    label="Nhập lại mật khẩu"
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Re-password"
                    className='form-input'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Tôi đồng ý với điều khoản dịch vụ!</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading} >
                    Đăng ký
                    </Button>
                    Hoặc <Link to="/login">Đăng nhập</Link>
                </Form.Item>
                </Form>
                </Col>
            </Row>
            
        </div>
    );
}

export default ResignPage;