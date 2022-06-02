import React, { useEffect, useState } from 'react';
import { Col, Row, Image, Badge, Avatar, Dropdown, Menu} from "antd";
import { BellOutlined , UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../../redux/actions/auth';

import './Header.css';
import apis from '../../redux/apis';

function Header() {

  const history = useHistory();
  const dispacth = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const userId = useSelector((state) => state.auth.userId);
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const avatar = useSelector((state) => state.auth.avatar);
  const name = useSelector((state) => state.auth.name);
  const id = useSelector((state) => state.auth.id);

  const [listNotify, setListNotify] = useState([]);
  const [totalNotify, setTotalNotify] = useState()

  const path = window.location.pathname;

  const dropDownNotify = (
    <Menu
      items={listNotify}
    />
  );
  
  
  const logout = () => {
    dispacth(logOut(history))
  }

  const getListNotify=() =>{ 
    apis.notifications
        .getNotifications('',0,1000)
        .then(res => {
          var data = res.data;
          var notifies = res.data.data.denys
          setTotalNotify(res.data.data.total_not_read)
          var arrTmp = []
          for (var i = 0; i < notifies.length; i++) {
              var noti = {
                label: notifies[i].reason,
                key: notifies[i].type
              }
              arrTmp.push(noti)
          }
          setListNotify(arrTmp)
        })
  }

  useEffect(()=>{
    if (isLogin) {
      getListNotify()
    }
  }, [])

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
                      <Badge count={totalNotify} size='small'>
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

        </div>
    );
  }

export default Header;