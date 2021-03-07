import React from "react";
import { Layout } from "antd";

import "./index.css";


const { Header, Content } = Layout;

const LayoutWithRoute = ({ children }) => {
  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ position: 'fixed' , top: 0 , width: '100%' , marginTop: 0, fontSize:20 }}>
          Order
        </Header>

        <Layout>
          <Content
            className="site-layout-background"
            style={{
              margin: "60px 16px",
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
