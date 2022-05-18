import React from 'react';
import { Col, Row, Image, Badge, Avatar, Dropdown, Menu} from "antd";
import { BellOutlined , UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import './Header.css';

const dropDownNotify = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        label: '3rd menu item',
        key: '2',
      },
      {
        label: '4rd menu item',
        key: '3',
      },
      {
        label: '5rd menu item',
        key: '4',
      },
    ]}
  />
);

function Header() {

  const email = useSelector((state) => state.auth.email);
  const userId = useSelector((state) => state.auth.userId);
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const avatar = useSelector((state) => state.auth.avatar);
  const name = useSelector((state) => state.auth.name);
  const id = useSelector((state) => state.auth.id);

  const path = window.location.pathname;
  
  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("exp", 0);
    localStorage.setItem("avatar", null);
    localStorage.setItem("role_id", null);
    localStorage.setItem("user_id", null);
    localStorage.setItem("email", null);
    localStorage.setItem("name", null);
  }

  const dropDownAvatar = (
    <Menu
      items={[
        {
          label: <Link to={`/account`}>{email}</Link>,
          key: '0',
        },
  
        {
          type: 'divider',
        },
        {
          label: <Link to={`/account`}>Thông tin tài khoản</Link>,
          key: '1',
        },
        {
          label: <Link to={`/login`} onClick={logout}>Đăng xuất</Link>,
          key: '3',
        },
      ]}
    />
  );
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
                <Row align="middle" style={{display:"flex", justifyContent: "right", width:'100%'}}>
                  <Col span={3}>
                    <Dropdown overlay={dropDownNotify} trigger={['click']} placement="bottom">
                      <Badge count={5} size='small'>
                        <BellOutlined style={{fontSize:'22px'}} className='notify' />
                      </Badge>
                    </Dropdown> 
                  </Col>
                  {
                    isLogin 
                    ?
                    <Col span={8}>
                      {
                        <Link to={`/my-auctions`}><span className='my-auction'>Đấu giá của tôi</span></Link> 
                      }
                      
                    </Col>
                    :
                    <Col></Col>
                  }

                  <div className='line-head'></div>
                  <Col span={8}>
                    {
                      isLogin
                      ? 
                      <div className='avatar-header'>
                        <Dropdown overlay={dropDownAvatar} trigger={['click']} placement="bottom">
                          <img src={avatar} alt="ảnh đại điện"  />
                        </Dropdown>
                      </div>
                      : 
                      path === '/login' 
                      ?
                      <Link to={`/register`} style={{display:"flex", color:'black'}} >
                        <UserOutlined style={{ fontSize: '24px' }} />
                        <Col style={{ fontSize: '18px', padding: "0 10px" }} >
                          Đăng ký
                        </Col>
                      </Link>
                      :
                      <Link to={`/login`} style={{display:"flex", color:'black'}} >
                        <UserOutlined style={{ fontSize: '24px' }} />
                        <Col style={{ fontSize: '18px', padding: "0 10px" }} >
                          Đăng nhập
                        </Col>
                      </Link>
                    }
                  </Col>
                </Row>
                
            </Col>
          </Row>
          
          <hr style={{color:""}}/>
          
          {/* <Row style={{padding: "5px 26px", fontSize:"1.3em"}} justify="space-around" align="middle">
            <Col span={3} > <Link to={'/'}  style={{color:'black'}}>Trang chủ </Link></Col>
            <Col span={2} > <Link to={'/dien-thoai'}  style={{color:'black'}}>Điện thoại </Link></Col>
            <Col span={2} > <Link to={'/laptop'}  style={{color:'black'}}>Laptop</Link></Col>
            <Col span={2} > <Link to={'/thoitrang'}  style={{color:'black'}}>Thời trang </Link></Col>
            <Col span={2} > <Link to={'/oto-xemay'}  style={{color:'black'}}>Ô tô - Xe máy</Link></Col>
            <Col span={2} > <Link to={'/tong-hop'}  style={{color:'black'}}>Tổng hợp </Link></Col>

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
          </Row> */}

        </div>
    );
  }

export default Header;