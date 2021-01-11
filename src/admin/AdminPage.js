import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import Menu from "../image/Menu.png";
import Promotion from "../image/tag.png";
import Table from "../image/chair.png";
import Report from "../image/dashboard.png";
import Staff from "../image/user.png";

const AdminPage = () => {
  const Rowler = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  };

  const card = {
    width: 250,
    textAlign: "center",
    borderRadius: "40px",
    border: "1px solid",
    margin: "10px",
  };

  return (
    <div>
      <div className="row" style={Rowler}>
        <div>
          <Link to="/admin/product">
            <Card style={card}>
              <img className="d-block w-100" src={Menu} alt="First slide" />
              <h5>Catagory & Menu</h5>
            </Card>
          </Link>
        </div>

        <div>
          <Link to="/signup">
            <Card style={card}>
              <img className="d-block w-100" src={Table} alt="First slide" />
              <h5>table</h5>
            </Card>
          </Link>
        </div>

        <div>
          <Card style={card}>
            <img className="d-block w-100" src={Promotion} alt="First slide" />
            <Link to="/Menu">
              <h5>Promotion</h5>
            </Link>
          </Card>
        </div>
      </div>

      <div className="row" style={Rowler}>
        <div>
          <Link to="/signup">
            <Card style={card}>
              <img className="d-block w-100" src={Staff} alt="First slide" />
              <h5>Staff</h5>
            </Card>
          </Link>
        </div>

        <div>
          <Link to="/create/product">
            <Card style={card}>
              <img className="d-block w-100" src={Report} alt="First slide" />
              <h5>Report</h5>
            </Card>
          </Link>
        </div>

        <div>
          <Link to="/create/product">
            <Card style={card}>
              <img className="d-block w-100" src={Menu} alt="First slide" />
              <h5>Catagory & Menu</h5>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
