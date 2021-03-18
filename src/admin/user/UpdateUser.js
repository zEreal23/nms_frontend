import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { isAuthenticated } from "../../auth";
import { getUser, updateUser } from "../apiAdmin";

const UpdateUser = ({ match }) => {
  const [values, setValue] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    error: false,
    success: false,
  });

  const { Option } = Select;

  const { name, email, password, role } = values;

  const { token } = isAuthenticated();

  const init = (userId) => {
    getUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setValue({
          ...values,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValue({ ...values, error: false, [name]: e.target.value });
  };


  const clickSubmit = () => {
    updateUser(match.params.userId, token, { name, email, role }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValue({
          ...values,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        });
      }
    });
  };

  const newUpdateForm = (name, email, password, role) => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
        />

        <label className="text-muted">Email</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
          autoFocus
          required
        />

        <label className="text-muted">Password</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("Password")}
          value={password}
          autoFocus
        />
      </div>

      <label className="text-muted">Role</label>
      <input
        type="text"
        className="form-control"
        onChange={handleChange("role")}
        value={role}
        autoFocus
        required
      />

      <button className="btn btn-outline-primary" style={{ margin: 10 }}>
        Update
      </button>

                <Link to={'/Manage/users'}>
                    <span
                        type="button"
                        className="btn btn-outline-warning"
                        style={{marginRight: 10}}
                    >
                        Back
                    </span>
                </Link>
         
    </form>
  );

  return (
    <div className="row">
      <div
        className="col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card title={<h4>Edit Form</h4>} style={{borderRadius:10, width: '500px'}}>
        {newUpdateForm(name, email, password, role)}
        </Card>
      </div>
    </div>
  );
};

export default UpdateUser;
