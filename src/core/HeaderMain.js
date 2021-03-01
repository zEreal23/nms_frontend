import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown, Breadcrumb } from "antd";
import { Link, useLocation, withRouter } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DownOutlined,
} from "@ant-design/icons";

import MenuinSidebar from "../component/Layout/MenuinSidebar";
import logo from "../image/LOGONMD.png";
import "./index.css";
import { signout, isAuthenticated } from "../auth";

const { Header, Sider, Content, Footer } = Layout;

const LayoutWithRoute = ({ children, history }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const ToggleButton = () => {
    setCollapsed(!collapsed);
  };

  const dropdownMenu = () => (
    <Menu>
      <Menu.Item key="/admin/home">
        <Link to="/admin/home" />
        Home
      </Menu.Item>

      <Menu.Item key="/admin/home">
        <Link to="/admin/home" />
        Profile
      </Menu.Item>

      <Menu.Item
        onClick={() =>
          signout(() => {
            history.push("/signin");
          })
        }
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className="site-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="site-layout-background"
        >
          <div className="logo">
            <img src={logo} style={{ height: 40, width: "auto" }} />
          </div>
          <MenuinSidebar />
        </Sider>

        <Layout>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: ToggleButton,
              }
            )}

            <Dropdown overlay={dropdownMenu}>
              <Button style={{ margin: 15, float: "right", borderRadius: 25 }}>
                {`${isAuthenticated().user.name}`}
                <DownOutlined />
              </Button>
            </Dropdown>
          </Header>

          <Content style={{ height:'100%'}}>
            <Breadcrumb style={{ margin: "10px 16px" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                margin: "10px",
                padding: 1,
                height: "100%",
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" , button: 0 }}>
            Namodin ©2021 Created by zEreal23
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(LayoutWithRoute);
