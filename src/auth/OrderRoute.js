import React from 'react'
import { Route } from "react-router-dom";

import Layout from '../core/HeaderOrder';

const OrderRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        <Layout>
          <Component {...props} />
        </Layout>
    }
    />
)

export default OrderRoute
