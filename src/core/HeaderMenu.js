import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import "./index.css";

const { Header ,Content } = Layout;

const LayoutWithRoute = ({ children}) => {
  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ position: 'fixed' , top: 0 , width: '100%' , marginTop: 0, fontSize:30 }}>
          Menu
            <Link to="/cart" style={{float:'right' , marginRight:10 }}>
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
