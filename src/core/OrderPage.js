import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import NumberFormat from 'react-number-format';

import {getTable} from '../admin/apiAdmin';
import {getOrder} from './apiCore';
import {HOST} from '../config';

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
                console.log('1', data.orders);
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
            <div>
                <h1>Your Order</h1>

                {order.map((data, index) => (
                    <Card key={index} hoverable>
                        <h5>Order No. {data._id}</h5>
                        {data.products.map((menu, index) => (
                            <Card key={index}>
                                <Row>
                                    <Col span={24}>
                                        <img
                                            src={`${HOST}/${menu.product.photo}`}
                                            alt="photoMenu"
                                            style={{
                                                height: 'auto',
                                                width: '100%',
                                                borderRadius: '5px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Col>
                                    <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                                        <span style={{marginLeft: 10}}>
                                            {menu.product.name}
                                        </span>
                                    </Col>
                                    <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                                        <span style={{marginLeft: 10}}>
                                            {menu.quantity}
                                        </span>
                                    </Col>
                                </Row>
                            </Card>
                        ))}

                        <h5>amount: {data.amount}</h5>
                    </Card>
                ))}
            </div>
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
            {order.length > 0 ? ShowItems() : noOrder()}
            <div
                style={{
                    bottom: 0,
                    position: 'fixed',
                    right: 0,
                    left: 0,
                    backgroundColor: 'white',
                }}
            >
                <hr />
                <NumberFormat
                    value={getTotal()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'NT$ '}
                    renderText={(value) => <h1>Total : {value} TWD</h1>}
                />
            </div>
        </div>
    );
};

export default OrderPage;
