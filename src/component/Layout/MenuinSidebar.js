import React from "react";
import { Menu } from "antd";
import { Link, useLocation, withRouter } from "react-router-dom";
import { HomeOutlined, FormOutlined, LogoutOutlined, AuditOutlined } from "@ant-design/icons";

import { signout } from "../../auth";

const MenuinSidebar = ({ history }) => {
  const location = useLocation();
  const { SubMenu } = Menu;
  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="/admin" icon={<HomeOutlined style={{fontSize:20}} />}>
        <Link to="/admin">Home</Link>
      </Menu.Item>

      <SubMenu key="sub1" icon={<FormOutlined style={{fontSize:20}}/>} title="Manage">
        <Menu.Item key="1">
          <Link to="/Manage/category">Category</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/Manage/Menu">Menu</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/Manage/table">Table</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/Manage/users">Order</Link>
        </Menu.Item>

        <Menu.Item key="4">
          {" "}
          <Link to="/Manage/users">Staff</Link>
        </Menu.Item>

        <Menu.Item key="5">Promotion</Menu.Item>
      </SubMenu>

      <Menu.Item icon={<AuditOutlined style={{fontSize:20}} />}>
          <Link to="/">Order</Link>
        </Menu.Item>

      <Menu.Item
        onClick={() =>
          signout(() => {
            history.push("/signin");
          })
        }
        icon={<LogoutOutlined style={{fontSize:20}} />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(MenuinSidebar);
