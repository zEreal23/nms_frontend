import React from "react";
import { Card } from "antd";

import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <Card title="Admin" style={{ width: 300}}>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Menu
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
            Manage Products
          </Link>
        </li>
      </Card>
    );
  };

  const adminInfo = () => {
    return (
      <Card title="Admin" style={{ width: 300}}>
        <h3 className="card-header">Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </Card>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <div>{adminLinks()}</div>
            <div>{adminInfo()}</div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
