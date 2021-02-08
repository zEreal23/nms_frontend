import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import MenuFood from "../image/Menu.png";
import Promotion from "../image/tag.png";
import Table from "../image/chair.png";
import Report from "../image/dashboard.png";
import Staff from "../image/user.png";
import Guide from "../image/guide.png";
import "./index.css";
import { signout } from "../auth";

const { Header, Sider, Content } = Layout;

const LayoutWithRoute = ({ children , history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const ToggleButton = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: ToggleButton,
            }
          )}
          <Menu style={{ float: "right"}}>
            <Menu.Item
              key="Logout"
              onClick={() =>
                signout(() => {
                  history.push("/signin");
                })
              }
            >
              Logout
            </Menu.Item>
          </Menu>
        </Header> 

        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="site-layout-background"
          >
            <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
              <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
                <Link to="/admin/home">Home</Link>
              </Menu.Item>
              <Menu.Item
                key="/admin/product"
                icon={
                  <img
                    src={MenuFood}
                    alt="First slide"
                    style={{ height: "25px", width: "25px" }}
                  />
                }
              >
                <Link to="/admin/product">Category & Menu</Link>
              </Menu.Item>
              <Menu.Item
                key="/users"
                icon={
                  <img
                    src={Staff}
                    alt="First slide"
                    style={{ height: "25px", width: "25px" }}
                  />
                }
              >
                <Link to="/users">Staff</Link>
              </Menu.Item>

              <Menu.Item
                key="/admin/table"
                icon={
                  <img
                    src={Table}
                    alt="First slide"
                    style={{ height: "25px", width: "25px" }}
                  />
                }
              >
                <Link to="/admin/table">Table</Link>
              </Menu.Item>

              <Menu.Item
                key="/admin/report"
                icon={
                  <img
                    src={Report}
                    alt="First slide"
                    style={{ height: "25px", width: "25px" }}
                  />
                }
              >
                <Link to="/admin/report">Report</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutWithRoute;
