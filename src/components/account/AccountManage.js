import React from 'react';

import {Card, Col, Row} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../manage/HomeManage.css';

import { Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined,KeyOutlined, FormOutlined, ProfileOutlined } from '@ant-design/icons'

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const items = [
    getItem('Thông tin tài khoản', 'sub1', <UserOutlined />),
    getItem('Thay đổi thông tin', 'sub2', <FormOutlined />),
    getItem('Đổi mật khẩu', 'sub3', <KeyOutlined />),
    getItem('Mua lượt đấu giá', 'sub4', <ShoppingCartOutlined />),
    getItem('Đấu giá của tôi', 'sub5', <ProfileOutlined />),
  ]; // submenu keys of first level
  
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];

function AccountManage() {
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };
  
    return (
        <div className='main-center'>
            <Row align='middle' justify='center' >
                <Col style={{width: "1200px"}}>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        style={{
                        width: 256,
                        }}
                        items={items}
                    />
                </Col>
            </Row>
        </div>
        

    );
}

export default AccountManage;