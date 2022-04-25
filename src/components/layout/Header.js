import React from 'react';
import { Col, Row, Image, Input, Space, Button, Divider } from "antd";
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Category from '../category/Category';

function Header() {
  const path = window.location.pathname;

  const renderLinkLogin = () => {
    if (path === '/login') {
      return (
        <Link to={`/register`} style={{display:"flex", color:'black'}} >
          <UserOutlined style={{ fontSize: '24px' }} />
          <Col style={{ fontSize: '18px', padding: "0 10px" }} >
            Đăng ký
          </Col>
        </Link>
      );
    }
    if (path === '/register') {
      return (
        <Link to={`/login`} style={{display:"flex", color:'black'}} >
          <UserOutlined style={{ fontSize: '24px' }} />
          <Col style={{ fontSize: '18px', padding: "0 10px" }} >
            Đăng nhập
          </Col>
        </Link>
      );
    }
    if (path === '/') {
      return (
        <Link to={`/login`} style={{display:"flex", color:'black'}} >
          <UserOutlined style={{ fontSize: '24px' }} />
          <Col style={{ fontSize: '18px', padding: "0 10px" }} >
            Đăng nhập
          </Col>
        </Link>
      );
    }
  }

    return(
        <div style={{marginBottom:"20px"}}>
          <Row style={{height: "80px", padding: "0 26px"}} justify="space-around" align="middle">
            <Col span={8}>
            <Link to={``}>
              <Image
                width={250}
                src="https://res.cloudinary.com/litchitech/image/upload/v1650635075/WEB-BID/clm_logo_itjcyx.png"
                preview={false}
              />
            </Link>
            
            </Col>
            <Col span={8} offset={8} >
                <Row align="middle" style={{display:"flex", justifyContent: "right"}}>
                  {renderLinkLogin()}
                </Row>
                
            </Col>
          </Row>
          
          <hr style={{color:""}}/>
          
          <Row style={{padding: "5px 26px", fontSize:"1.3em"}} justify="space-around" align="middle">
            <Col span={3} > Trang chủ </Col>
            <Col span={2} > Điện thoại</Col>
            <Col span={2} > Laptop</Col>
            <Col span={2} > Thời trang</Col>
            <Col span={2} > Ô tô - Xe máy</Col>
            <Col span={2} > Tổng hợp</Col>

            <Col span={7} style={{display:"flex", justifyContent: "right"}}>
              <Space>
                <Input placeholder='Tìm kiếm tên đấu giá' style={{width: "290px"}}/>
                <Button
                  type='primary'
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Space>
            </Col>
          </Row>

        </div>
    );
}

export default Header;