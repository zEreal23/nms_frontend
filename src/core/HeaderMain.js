import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import MenuinSidebar from "../component/Layout/MenuinSidebar";
import BreadCrumb from "../component/Layout/BreadCrumb";
import logo from "../image/LOGONMD.png";
import "./index.css";
import { signout, isAuthenticated } from "../auth";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const LayoutWithRoute = ({ children, history }) => {
  const [collapsed, setCollapsed] = useState(false);

  const ToggleButton = () => {
    setCollapsed(!collapsed);
  };

  const dropdownMenu = () => (
    <Menu>
      <Menu.Item key="/admin">
        <Link to="/admin" />
        Home
      </Menu.Item>

      <Menu.Item key="/admin">
        <Link to="/admin" />
        Profile
      </Menu.Item>

      <SubMenu title="Manage">
        <Menu.Item key="1">
          <Link to="/Manage/category">Category</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/Manage/Menu">Menu</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/Manage/table">Table</Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/Manage/users">Staff</Link>
        </Menu.Item>

        <Menu.Item key="5">Promotion</Menu.Item>
      </SubMenu>

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
            <img src={logo} alt="logo" style={{ height: 40, width: "auto" }} />
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
            <NotificationOutlined
              style={{ margin: 20, float: "right", fontSize: 20 }}
            />
          </Header>

          <Content style={{ margin: 5 }}>
            <div style={{ margin: "10px 16px" }}>
              <BreadCrumb />
            </div>
            {children}
          </Content>
          <Footer style={{ textAlign: "center", button: 0 }}>
            Namodin ©2021 Created by zEreal23
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(LayoutWithRoute);
