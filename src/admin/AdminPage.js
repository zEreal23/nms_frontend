import React from "react";
import { Card, Row, Col } from "antd";

import MangeCetagories from "./category/ManageCategory";
import ManageStaff from "./user/ManageUser";
import ManageMenu from "./Menu/ManageProduct";


const AdminPage = () => {

  const card = {
    borderRadius: 25,
    width: "auto",
    margin: 5,
  };


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

      <MangeCetagories />
      <ManageMenu />
      <ManageStaff />
    </div>
  );
};

export default AdminPage;
