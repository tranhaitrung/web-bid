import React from 'react';

import { Col, Row} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";
import '../manage/HomeManage.css';

import { Menu } from 'antd';
import { ShoppingCartOutlined,KeyOutlined, ProfileOutlined } from '@ant-design/icons';

const menu = [
  { icon: <UserOutlined/>, label: 'Thông tin tài khoản', path: '/account/info' },
  { icon: <KeyOutlined/>, label: 'Đổi mật khẩu', path: '/account/change-pass' },
  { icon: <ShoppingCartOutlined/>, label: 'Mua gói đấu giá', path: '/account/buy-bid-package' },
  { icon: <ProfileOutlined/>, label: 'Đấu giá của tôi', path: '/account/my-auctions' },
];

class MenuUser extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { pathname } = this.props.location;
    const selectedOrOpenKeys = this.getSelectedKeys(menu, pathname);
    const { children } = this.props;
    return (
      <Row align='middle' justify='center' >
        <Col style={{width: "1200px"}}>
          <Row style={{width:'100%'}}>
            <Col style={{width:'25%'}}>
              <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={selectedOrOpenKeys}
                defaultSelectedKeys={selectedOrOpenKeys}
              >
                {menu.map(this.renderMenuItem)}
              </Menu>
            </Col>
            <Col style={{width:'75%'}}>
              {children}
            </Col>
            
          </Row>
        </Col>
      </Row>
    );
  }

  getSelectedKeys(items, pathname) {
    let selectedKeys = [];

    items.map(item => {
      if (item.isSelected) {
        if (item.isSelected(pathname)) {
          selectedKeys.push(item.key ? item.key : item.path);
        }
      } else {
        if (item.path === pathname || item.key === pathname) {
          selectedKeys.push(item.key ? item.key : item.path);
        }
      }
      if (item.items) {
        const itemKeys = this.getSelectedKeys(item.items, pathname);
        selectedKeys.push(...itemKeys);
      }
    });

    return selectedKeys;
  }

  renderMenuItem = item => {
    const { label, path, items, icon, key, ...rest } = item;

    return (
      <Menu.Item key={key || path} {...rest} 
      onClick={() => {
        this.props.history.push(path)
      }}
      >
        {icon}
        <span>{label}</span>
      </Menu.Item>
    );
  };
}

export default withRouter(MenuUser);