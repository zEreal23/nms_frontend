import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import NumberFormat from 'react-number-format';

import {getTable} from '../admin/apiAdmin';
import {getOrder} from './apiCore';
import {HOST} from '../config';

import './Menu.css';

const OrderPage = ({match}) => {
    const [order, setOrder] = useState([]);
    const [noTable, setNotable] = useState([]);
    const [error, setError] = useState(false);

    const loadOrder = (tableId) => {
        getOrder(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setOrder(data.orders);
            }
        });
    };

    const init = (tableId) => {
        getTable(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setNotable(data);
            }
        });
    };

    useEffect(() => {
        loadOrder(match.params.tableId);
        init(match.params.tableId);
    }, []);

    const ShowItems = () => {
        return (
            <>
                {order.map((data, index) => (
                    <Card
                        key={index}
                        style={{marginBottom: 10}}
                        bodyStyle={{padding: 0}}
                        title={
                            <span className="text-menu-user">
                                Order No. {data._id}
                            </span>
                        }
                    >
                        <div className="order-container">
                            {data.products.map((menu, iInner) => (
                                <Row key={iInner}>
                                    <Col span={24}>
                                        <img
                                            src={`${HOST}/${menu.product.photo}`}
                                            alt="photoMenu"
                                            className="img-user-menu"
                                        />
                                    </Col>
                                    <Col
                                        span={18}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 20,
                                            }}
                                        >
                                            {menu.product.name}
                                        </span>
                                    </Col>
                                    <Col
                                        span={6}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 20,
                                            }}
                                        >
                                            {menu.quantity}
                                        </span>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </Card>
                ))}
            </>
        );
    };

    const noOrder = () => (
        <h2>
            Your don't have any food order
            <br />
            <Link to={`/Menu/${noTable._id}`}></Link>{' '}
        </h2>
    );

    const getTotal = () => {
        return order.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.amount;
        }, 0);
    };

    return (
        <div>
            <Link
                to={`/Menu/${noTable._id}`}
                style={{top: 17, left: 10, position: 'fixed'}}
            >
                <LeftOutlined style={{fontSize: '22px', color: 'black'}} />
            </Link>
            <div>{order.length > 0 ? ShowItems() : noOrder()}</div>
            <div className="footer-order-menu">
                <NumberFormat
                    value={getTotal()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'NT$ '}
                    renderText={(value) => (
                        <h1 style={{paddingTop: 20}}>Total : {value} TWD</h1>
                    )}
                />
            </div>
        </div>
    );
};

export default OrderPage;
