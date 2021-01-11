import React, { useState } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  TableOutlined,
  EditOutlined,
  LogoutOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import { signout, isAuthenticated } from "../auth";
import {itemTotal} from './CartOrder';

const { SubMenu, Item, ItemGroup } = Menu;

/*const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};*/

const Header = ({ history }) => {
  const [current, setCurrent] = useState("signin");

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {!isAuthenticated() && (
        <Item key="signin" icon={<UserOutlined />} className="float-right">
          <Link to="/signin" path>
            Login
          </Link>
        </Item>
      )}

      {isAuthenticated() && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Setting"
          className="float-right"
        >
          <ItemGroup title="Manage">
            <Item key="Table" icon={<EditOutlined />}>
              {" "}
              <Link to="/table" path>
                Table
              </Link>
            </Item>

            <Item key="Category" icon={<TableOutlined />}>
              <Link to="/create/category" path>
                Add Category
              </Link>
            </Item>

            <Item key="Menu" icon={<TableOutlined />}>
              <Link to="/create/product" path>
                Add Menu
              </Link>
            </Item>

            <Item key="Mage Menu" icon={<TableOutlined />}>
              <Link to="/admin/product" path>
                Manage Menu
              </Link>
            </Item>

            <Item key="Staff" icon={<TeamOutlined />}>
              <Link to="/signup" path>
                Add Staff
              </Link>
            </Item>
          </ItemGroup>

          <ItemGroup title="User">
            <Item
              key="Logout"
              icon={<LogoutOutlined />}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
        <Item key="cart" icon={<SolutionOutlined />} className="float-right">
        <Link to="/cart" path >
          list <sup><small className="cart-badge">{itemTotal()}</small></sup>
        </Link>
      </Item>
      <Item key="Menu" icon={<UserOutlined />} className="float-right">
        <Link to="/Menu" path>
          Menu
        </Link>
      </Item>
      
    </Menu>
   
  );
};

export default withRouter(Header);
