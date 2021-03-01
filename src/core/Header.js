import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  TableOutlined,
  EditOutlined,
  LogoutOutlined,
  SolutionOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./CartOrder";

const { SubMenu, Item, ItemGroup } = Menu;

const Header = ({ history }) => {
  const [current, setCurrent] = useState("signin");
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <>
      {isAuthenticated() && (
        <>
          <Button onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            title="Menu"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu mode="inline">
              <Menu.Item key="1">
                <Link to="/admin/home" path>
                  Home
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/admin/product">
                  Category & Menu
                </Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Link to="/users">
                  Staff
                </Link>
              </Menu.Item>

              <Menu.Item key="4">
                <Link to="/admin/home">
                  Table
                </Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to="/admin/home">
                  Report
                </Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to="/admin/home">
                  Guide
                </Link>
              </Menu.Item>

              <Menu.Item
                key="Menu"
                icon={<UserOutlined />}
                className="float-right"
              >
                <Link to="/Menu" path>
                  Menu
                </Link>
              </Menu.Item>

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
          </Drawer>
        </>
      )}
      <div>
        <Menu>
          <Menu.Item
            key="cart"
            icon={<SolutionOutlined />}
            className="float-right"
          >
            <Link to="/cart" path>
              list{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default withRouter(Header);
