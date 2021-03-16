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

  const handleRole = (name) => {
    setValue({...values, error: false, role: name, });
  };

  const clickSubmit = () => {
    updateUser(match.params.userId, token, { name }).then((data) => {
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


  const updateForm = (name, email, password, role) => (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={clickSubmit}
    >
      <Form.Item
        name={name}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="text"
          //placeholder="Input nickname"
          value={name}
          onChange={handleChange("name")}
        />
      </Form.Item>

      <Form.Item
        name="Email"
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="example@domain.com"
          value={email}
          onChange={handleChange("email")}
        />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={password}
          onChange={handleChange("password")}
        />
      </Form.Item>

      <Form.Item name="role" label="Role">
          <Select
            placeholder="Select a option and change input text above"
            onChange={handleRole}
            value={role}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="staff">Staff</Option>
            <Option value="chef">Chef</Option>
          </Select>
        </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

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
        <Card title={<h4>Edit Form</h4>} style={{borderRadius:10}}>
        {newUpdateForm(name, email, password, role)}
        </Card>
      </div>
    </div>
  );
};

export default UpdateUser;
