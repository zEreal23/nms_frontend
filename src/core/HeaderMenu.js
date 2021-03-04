import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import "./index.css";
import { itemTotal } from "./CartOrder";

const { Header ,Content } = Layout;

const LayoutWithRoute = ({ children}) => {
  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ position: 'fixed' , top: 0 , width: '100%' , marginTop: 0 }}>
          รายการ
            <Link to="/cart" style={{float:'right' , marginRight:10 }}>
              list{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
        </Header>

        <Layout>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 1400,
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
