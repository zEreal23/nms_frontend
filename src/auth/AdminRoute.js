import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isAuthenticated} from './index';
import Layout from '../core/HeaderMain';

const AdminRoute = ({component: Component, ...rest}) => {
    const renderContent = (props) => {
        const isAuth = isAuthenticated();
        const isAdmin = isAuthenticated() && isAuthenticated().user.role === 1;
        const isManager = false;

        if (isAuth) {
            if (isAdmin) {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }

            if (isManager) {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }

            return (
                <Redirect
                    to={{
                        pathname: '/403',
                        state: {from: props.location},
                    }}
                />
            );

        } else {
            return (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location},
                    }}
                />
            );
        }
    };

    return <Route {...rest} render={(props) => renderContent(props)} />;
};

export default AdminRoute;
