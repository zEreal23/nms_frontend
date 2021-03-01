import React from "react";
import { Menu } from "antd";
import { Link, useLocation, withRouter } from "react-router-dom";
import {HomeOutlined,FormOutlined,LogoutOutlined} from "@ant-design/icons";

import MenuFood from "../../image/Menu.png";
import Promotion from "../../image/tag.png";
import Table from "../../image/chair.png";
import Report from "../../image/dashboard.png";
import Staff from "../../image/user.png";
import Guide from "../../image/guide.png";

import { signout  } from '../../auth';

const MenuinSidebar = ({history}) => {
  const location = useLocation();
  const { SubMenu } = Menu;
  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
        <Link to="/admin/home">Home</Link>
      </Menu.Item>

      <SubMenu key="sub1" icon={<FormOutlined />} title="Manage">

          <Menu.Item key="1"><Link to="/admin/product">Category</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/admin/product">Menu</Link></Menu.Item>
     

          <Menu.Item key="3"><Link to="/admin/table">Table</Link></Menu.Item>
       
 
          <Menu.Item key="4"> <Link to="/users">Staff</Link></Menu.Item>
       

          <Menu.Item key="5">Promotion</Menu.Item>
  
      </SubMenu>

      <Menu.Item
        onClick={() =>
          signout(() => {
            history.push("/signin");
          })
        }
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(MenuinSidebar);
