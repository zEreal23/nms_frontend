import React from 'react'
import { Route } from "react-router-dom";
import Layout from '../core/HeaderMenu';

const MenuRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        <Layout>
          <Component {...props} />
        </Layout>
    }
    />
)

export default MenuRoute
