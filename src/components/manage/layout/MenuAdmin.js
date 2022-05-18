import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Row,
  Typography,
  Col,
  Calendar,
} from "antd";
import {
  faChalkboardTeacher,
  faUserGraduate,
  faSchool,
  faHammer,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { SiderWrapper, HeaderWrapper, ContentWrapper } from "./MenuStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppstoreOutlined, TeamOutlined, FileDoneOutlined, SettingOutlined, BarsOutlined, TagsOutlined, InboxOutlined } from '@ant-design/icons';

import { useHistory } from "react-router";
import { Link } from "react-router-dom";


function MenuAdmin(props) {
  const path = window.location.pathname;
  const history = useHistory();
  const [key, setKey] = useState(["/timetable"]);
  const { children } = props;

  const onRenderDefaultKeyMenu = () => {
    let defaultKey = path.includes("/admin/accept-auctions")
      ? "/admin/accept-auctions"
      : path.includes("/admin/manage-auctions")
      ? "/admin/manage-auctions"
      : path.includes("/admin/users")
      ? "/admin/users"
      : path.includes("/admin/categories")
      ? "/admin/categories"
      : path.includes("/admin/bids")
      ? "/admin/bids"
      : path.includes("/admin/items")
      ? "/admin/items"
      : path.includes("/admin/brands")
      ? "/admin/brands"
      : "/admin/accept-auctions";
    return defaultKey;
  };

  return true ? (
    <Layout style={{ minHeight: "100vh", background: "#f65f6f8" }}>
      <SiderWrapper theme="light">
        <Menu
          defaultSelectedKeys={onRenderDefaultKeyMenu()}
          mode="inline"
          key={key}
        >
          <Menu.Item key="/admin/accept-auctions" icon={<FileDoneOutlined style={{ fontSize: "20px" }}/>}>
            <Link to="/admin/accept-auctions">Duyệt đấu giá</Link>
          </Menu.Item>
          <Menu.Item key={"/admin/manage-auctions"} icon={<AppstoreOutlined style={{ fontSize: "20px" }}/>}>
            <Link to="/admin/manage-auctions">Quản lý đấu giá</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/users"
            icon={< TeamOutlined style={{ fontSize: "20px" }}/>}
          >
            <Link to="/admin/users">Quản lý thành viên</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/items"
            icon={ <InboxOutlined style={{ fontSize: "20px" }}/>}
          >
            <Link to="/admin/items">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/brands"
            icon={ <TagsOutlined style={{ fontSize: "20px" }}/>}
          >
            <Link to="/admin/brands">Quản lý thương hiệu</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/categories"
            icon={<BarsOutlined style={{ fontSize: "20px" }}/>}
          >
            <Link to="/admin/categories">Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/bids"
            icon={ <SettingOutlined style={{ fontSize: "20px" }}/>}
          >
            <Link to="/admin/bids">Quản lý gói đấu giá</Link>
          </Menu.Item>
        </Menu>
      </SiderWrapper>
      <Layout className="site-layout">
        <ContentWrapper style={{ margin: "0 16px" }}>{children}</ContentWrapper>
      </Layout>
    </Layout>
  ) : (
    //<PageNotFound history={history} />
    <div></div>
  );
}

export default MenuAdmin;
