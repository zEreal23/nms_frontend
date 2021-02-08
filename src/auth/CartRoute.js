import React from 'react'
import { Route } from "react-router-dom";

import Layout from '../core/HeaderCart';

const CartRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        <Layout>
          <Component {...props} />
        </Layout>
    }
    />
)

export default CartRoute
