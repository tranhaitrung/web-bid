import styled from "styled-components";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
export const SiderWrapper = styled(Sider)`
  &.ant-layout-sider {
    max-width: 300px !important;
    flex: 0 0 300px !important;
    min-width: 100px !important;
    width: 300px !important;
    box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%),
      0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%);
    .logo {
      padding: 10px;
    }

    .ant-menu {
      font-size: 17px;

      .ant-menu-item,
      .ant-menu-submenu-title {
        padding-left: 24px;
        height: 60px;
        display: flex;
        align-items: center;
      }

      .ant-menu-item:hover {
        background-color: #efefef;
      }
    }
  }
`;

export const HeaderWrapper = styled(Header)`
  &.ant-layout-header {
    background: linear-gradient(
      -45deg,
      rgba(147, 26, 222, 0.83) 0%,
      rgba(28, 206, 234, 0.82) 100%
    );
    box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 0%),
      0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 0%);
    .ant-typography {
      font-size: 23px;
      color: #fff;
    }
  }
`;

export const ContentWrapper = styled(Content)`
  .ant-breadcrumb {
    font-size: 18px;
  }
  .ant-col {
    .test {
      height: auto;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%),
        0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon-teacher {
        font-size: 30px;
        color: #30a5ff;
        margin-top: 10px;
      }

      .count {
        font-size: 30px;
        font-weight: 700;
      }

      .name {
        font-size: 17px;
        color: #b1a9a9;
        margin-bottom: 10px;
      }
      .icon-student {
        font-size: 30px;
        color: #1ebfae;
        margin-top: 10px;
      }

      .icon-classroom {
        color: #ffb53e;
        font-size: 30px;
        margin-top: 10px;
      }

      .icon-device {
        color: #ff7875;
        font-size: 30px;
        margin-top: 10px;
      }
    }

    .calendar {
      .ant-picker-calendar {
        border-radius: 15px;
        box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%),
          0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%);
        background-color: white;
      }
      .ant-picker-calendar-header {
        padding-right: 10px;
      }

      .ant-picker-panel {
        padding: 10px;
        border-radius: 15px;

        .ant-picker-calendar-date-content {
          overflow: hidden;
        }
      }
      .ant-picker-calendar-date-content {
        height: 60px;
      }

      .events {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .events .ant-badge-status {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .chart {
      border-radius: 15px;
      box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%),
        0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%);
      background-color: white;
      width: 100%;
      height: 315px;
      margin-bottom: 20px;
      padding-left: 20px;

      .title-chart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        font-weight: 700;
        margin-top: 6px;

        .comment {
          font-size: 15px;
          font-weight: 400;
          color: rgb(165 160 160 / 85%);
          margin-bottom: 20px;
        }
      }
      .title-device {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
