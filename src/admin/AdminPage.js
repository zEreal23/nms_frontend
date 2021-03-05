import React from "react";
import { Card, Row, Col, Tabs } from "antd";

import { API } from "../config";
import MangeCetagories from "./category/ManageCategory";
import ManageStaff from "./user/ManageUser";
import ManageMenu from "./Menu/ManageProduct";

const AdminPage = () => {
  const card = {
    borderRadius: 25,
    width: "auto",
    margin: 5,
  };

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const Tab = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Catagories" key="1">
        <MangeCetagories />
      </TabPane>
      <TabPane tab="Menu" key="2">
        <ManageMenu />
      </TabPane>
    </Tabs>
  );

  return (
    <div>
      <Row>
        <Col>
          <Card style={card}>
            <h5>Summary of weekly sales</h5>
            <h6>0</h6>
          </Card>
        </Col>

        <Col>
          <Card style={card}>
            <h5>Summary of month sales</h5>
            <h6>0</h6>
          </Card>
        </Col>

        <Col>
          <Card style={card}>
            <h5>Summary of year sales</h5>
            <h6>0</h6>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card style={card}>
          <Tab />
          </Card>
        </Col>
      </Row>

      <Row>
          <Col>
          <ManageStaff />
          </Col>
        </Row>
    </div>
  );
};

export default AdminPage;
