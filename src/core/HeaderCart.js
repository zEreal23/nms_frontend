import React from 'react';
import {Layout} from 'antd';
import {useHistory} from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons';

import './index.css';

const {Header, Content} = Layout;

const LayoutWithRoute = ({children}) => {
    const history = useHistory();

    const onGoBack = () => {
        history.goBack();
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
                        fontSize: 20,
                        zIndex: 999,
                    }}
                >
                    <div className="content-header-cart-user">
                        <button className="button-go-back" onClick={onGoBack}>
                            <LeftOutlined size={25} />
                        </button>
                        <span className="title-cart-user">Cart</span>
                    </div>
                </Header>

                <Layout>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '60px 16px',
                            padding: 24,
                            minHeight: 280,
                            marginBottom: 150,
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
