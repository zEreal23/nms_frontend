import React, {useState, useEffect} from 'react';
import {Row, Col, Card, message} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {LeftOutlined, PlusOutlined, MinusOutlined, DeleteOutlined} from '@ant-design/icons';
import NumberFormat from 'react-number-format';

import {API, HOST} from '../config';
import {getCart, deleteCart, postOder} from './apiCore';
import {getTable} from '../admin/apiAdmin';

import './Menu.css';

const CartPage = ({match}) => {
    const [menu, setData] = useState([]);
    const [noTable, setNotable] = useState([]);
    const [error, setError] = useState(false);
    const history = useHistory();

    const loadCart = (tableId) => {
        getCart(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setData(data.products);
                console.log('cart', data);
            }
        });
    };

    const init = (tableId) => {
        getTable(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setNotable(data);
                console.log('2', data);
            }
        });
    };

    const createOrder = (tableId, amount) => {
        postOder(tableId, amount).then((data) => {
            if (data.error) {
                console.log(data.error);
                message.error('order faild!');
            } else {
                loadCart(tableId);
                message.success('order success!');
                history.goBack();
            }
        });
    };

    const delCart = (productId, tableId) => {
        deleteCart(productId, tableId).then((data) => {
            if (data.error) {
                console.log(data.error);
                message.error('delete menu faild!');
            } else {
                loadCart(tableId);
                message.success('delete menu success!');
            }
        });
    };

    const ShowItems = () => {
        return (
            <div className="menu-container">
                {menu.map((p, i) => (
                    <Card key={i}>
                        <Row>
                            <Col span={24}>
                                <img
                                    src={`${HOST}/${p.productId.photo}`}
                                    alt="photoMenu"
                                    className="img-user-menu"
                                />
                            </Col>
                            <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                                <span className="text-menu-user">{p.productId.name}</span>
                            </Col>
                            <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                                <span className="text-menu-user">{p.quantity}</span>
                            </Col>
                            <Col span={24}>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => delCart(p.productId._id, noTable._id)}
                                    style={{width: '100%'}}
                                >
                                    <DeleteOutlined style={{fontSize: 20}} />
                                </button>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
        );
    };

    const noChact = () => (
        <h2>
            Your don't have any food in chart
            <br />
            <Link to={`/Menu/${noTable._id}`}></Link>{' '}
        </h2>
    );

    const getTotal = () => {
        return menu.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.quantity * nextValue.productId.price;
        }, 0);
    };

    useEffect(() => {
        loadCart(match.params.tableId);
        init(match.params.tableId);
    }, []);

    return (
        <div className="container">
             <h2>Cart {`${menu.length}`} items</h2>
            {menu.length > 0 ? ShowItems() : noChact()}
            <div
                style={{bottom: 0, position: 'fixed', right: 0, left: 0, backgroundColor: 'white'}}
            >
                <hr />
                <NumberFormat
                    value={getTotal()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'NT$'}
                    renderText={(value) => <h3>Total : {value} TWD</h3>}
                />

                <div>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => createOrder(noTable._id, getTotal())}
                    >
                        Submit{' '}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
