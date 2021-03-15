import React from 'react';
import {Layout, Button} from 'antd';

import './index.css';
import {useHistory, useRouteMatch} from 'react-router';

const {Header, Content} = Layout;
const LayoutWithRoute = ({children}) => {
    const macth = useRouteMatch();
    const history = useHistory();

    const onToOrder = () => {
        history.push(`/order/${macth.params.tableId}`);
    };

    return (
        <>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        marginTop: 0,
                        fontSize: 30,
                        zIndex: 900,
                    }}
                >
                    <div className="content-header-menu-user">
                        <span className="title-menu-user">Menu</span>
                        <Button type="primary" onClick={onToOrder}>
                            Your Orders
                        </Button>
                    </div>
                </Header>
                <Layout>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 1400,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutWithRoute;
