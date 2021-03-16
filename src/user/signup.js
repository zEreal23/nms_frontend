import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {signup} from '../auth';
import {Form, Input, Button, Select} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const {Option} = Select;

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        role: '',
        success: false,
        redirectToReferrer: false,
    });

    const {
        name,
        email,
        password,
        role,
        success,
        error,
        redirectToReferrer,
    } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const handleRole = (name) => {
      setValues({...values, error: false, role: name, });
    };

    const clickSubmit = (event) => {
        //event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password, role}).then((data) => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false,
                    redirectToReferrer: false,
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    error: '',
                    success: true,
                    redirectToReferrer: true,
                });
            }
        });
    };

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/Manage/users" />;
        }
    };

    const signUpForm = () => (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={clickSubmit}
        >
            <Form.Item
                name="nickname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="nickname"
                    value={name}
                    onChange={handleChange('name')}
                />
            </Form.Item>

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange('email')}
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
                    placeholder="Password"
                    onChange={handleChange('password')}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                'The two passwords that you entered do not match!',
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item name="role" label="Role" rules={[{required: true}]}>
                <Select
                    placeholder="Select a role"
                    onChange={handleRole}
                    allowClear
                >
                    <Option value="admin">admin</Option>
                    <Option value="chef">chef</Option>
                    <Option value="staff">staff</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Create Stuff
                </Button>
            </Form.Item>
            {redirectUser()}
        </Form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{display: success ? '' : 'none'}}
        >
            New account is created.
        </div>
    );

    return (
        <div className="row">
            <div
                className="col"
                style={{justifyContent: 'center', alignItems: 'center'}}
            >
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
        </div>
    );
};

export default Signup;
