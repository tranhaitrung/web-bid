import { Col, Row } from "antd";
import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { changePass } from "../../redux/actions/auth";

import '../FormInput.css';
import './Style.css';

function UserPassword() {

    const dispacth = useDispatch();
    const history = useHistory();
    const { isLoading } = useSelector((state) => state.auth);

    const onFinish = (values) => {
        const body = {
            old_pass: values.old_password,
            new_pass: values.new_password,
            re_pass: values.Repassword
        }
        dispacth(changePass(body, history));
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
                        name="old_password"
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
                        name="new_password"
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
                            <button className="btn-save btn-action " isLoading={isLoading}>Đổi mật khẩu</button>
                        </Row>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}

export default UserPassword;