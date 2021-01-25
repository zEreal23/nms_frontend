import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { signin, authenticate, isAuthenticated } from "../auth";


const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
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
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
            error: "",
          });
        });
      }
    });
  };

  const signInForm = () => (
    /*<div className="form-content-right">
      {showLoading()}
      {showError()}
      <form className="form" noValidate>
        <h1>You can login by filling out the information below.</h1>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>

        <Button 
          className="form-input-btn" 
          type="submit" disabled={!email || password.length < 6}
          onClick={clickSubmit}>
          Login
        </Button>
        {redirectUser()}
      </form>
    </div>*/
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={clickSubmit}
    >
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
          placeholder="Email"
          value={email}
          onChange={handleChange("email")}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password 
          prefix={<LockOutlined className="site-form-item-icon" />} 
          value={password}
          onChange={handleChange("password")}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
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
        return <Redirect to="/admin/home"/>;
      } else {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <div className="row">
      <div
        className="col"
        style={{ display:'flex' ,justifyContent: "center", alignContent: "center" }}
      >
        <Card title="Login" bordered={true} style={{ width: 300, borderRadius: 20 , marginTop: 150 }}>
          {showLoading()}
          {showError()}
          {signInForm()}
        </Card>
      </div>
    </div>
  );
};

export default Signin;
