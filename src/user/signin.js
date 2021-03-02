import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { signin, authenticate, isAuthenticated } from "../auth";
import logoNMD from "../image/LOGONMD.png";
import "../user/singin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    //event.preventDefault();
    setValues({ ...values, error: false, loading: false });
    signin({ email, password }).then((data) => {
      if (data.error) {
        console.log(data.error)
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      onFinish={clickSubmit}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={logoNMD}
          alt="logo"
          style={{ height:'250px', width: "auto" }}
        />
      </div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
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
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={password}
          placeholder="Password"
          onChange={handleChange("password")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width:'100%' }}>
          Submit
        </Button>
        {redirectUser()}
      </Form.Item>
    </Form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <div className="background-page" style={{  background:"black"}}>
      <div
        className="col"
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Card
          bordered={true}
          style={{
            borderRadius: 20,
            position: "fixed",
            marginTop:'100px',
            borderWidth: 1,
            borderColor:'black'
          }}
        >
          {showLoading()}
          {showError()}
          {signInForm()}
        </Card>
      </div>
    </div>
  );
};

export default Signin;
