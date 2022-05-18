import React from 'react';

import {Col, Row} from 'antd';
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

import '../manage/HomeManage.css';

import { Menu } from 'antd';
import { AppstoreOutlined, TeamOutlined, FileDoneOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons'

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
    getItem('Duyệt đấu giá', 'sub1', <FileDoneOutlined />,null,null),
    getItem('Quản lý đấu giá', 'sub2', <AppstoreOutlined />,null,null),
    getItem('Quản lý thành viên', 'sub3', <TeamOutlined />,null,null),
    getItem('Quản lý danh mục', 'sub4', <BarsOutlined />, [
        getItem('Option 9', '1'),
        getItem('Option 10', '2')
      ] ,null,null),
    getItem('Quản lý gói đấu giá', 'sub5', <SettingOutlined />, [
    getItem('Option 9', '3'),
    getItem('Option 10', '4'),
    ] ,null,null),
  ]; // submenu keys of first level
  
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];

function HomeManage() {
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

export default HomeManage;