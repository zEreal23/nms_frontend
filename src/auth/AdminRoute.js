import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./index";
import Layout from '../core/HeaderMain';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminRoute;
