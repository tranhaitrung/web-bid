import { Col, Row } from "antd";
import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateAccountInfo } from "../../redux/actions/auth";

import '../FormInput.css';
import './Style.css';

function UserInfo() {

    const dispacth = useDispatch();
    const history = useHistory();
    const { isLoading } = useSelector((state) => state.auth);

    const email = useSelector((state) => state.auth.email);
    const userId = useSelector((state) => state.auth.userId);
    const isLogin = useSelector((state) => state.auth.isLoggedIn);
    const avatar = useSelector((state) => state.auth.avatar);
    const name = useSelector((state) => state.auth.name);
    const phone = useSelector((state) => state.auth.phone)
    const id = useSelector((state) => state.auth.id);
    const address = useSelector((state) => state.auth.address);

    const onFinish = (values) => {
        const body = {
            email: values.email,
            name: values.name,
            avatar: values.avatar,
            phone: values.phone,
            address: values.address
        }
        dispacth(updateAccountInfo(body, history));
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
                    initialValues={{ remember: true,
                        name: name,
                        phone: phone,
                        email: email,
                        address: address
                    }}
                    onFinish={onFinish}
                    layout='vertical'
                    size='middle'
                    style={{width:'540px'}}
                    >
                    <div className="box1">
                        <div className="change-avatar">
                            <div className="left">
                                <img src={avatar} alt="ảnh đại điện" />
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
                            <button className="btn-save btn-action " isLoading={isLoading}>Cập nhật</button>
                        </Row>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}

export default UserInfo;