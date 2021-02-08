import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";

import "./index.css";


const { Header, Content } = Layout;

const LayoutWithRoute = ({ children }) => {
  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
            
          <Link to="/Menu" style={{ margin:10 }}>
            <ArrowLeftOutlined  style={{fontSize: '22px' , color:'black'}}/>
          </Link>
          รายการ
        </Header>

        <Layout>
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
