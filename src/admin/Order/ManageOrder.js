import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Button, Modal, notification} from 'antd';
import NumberFormat from 'react-number-format';

// import {isAuthenticated} from '../../auth';
import {getAllTable, onPaymentOrder} from '../apiAdmin';
import {getOrder} from '../../core/apiCore';
import {HOST} from '../../config';
import {isAuthenticated} from '../../auth'

const ManageOrder = () => {
    const [tables, setTable] = useState([]);
    const [order, setOrder] = useState([]);
    const [tableId, setTableId] = useState('');
    const [show, setShow] = useState(false);
    // const [dataModal, setDataModal] = useState(null);

    const loadTable = async () => {
        try {
            const data = await getAllTable();
            setTable([...data]);
        } catch (error) {
            console.log(error);
        }
    };

    const onShowModal = () => {
        setShow(true);
    };

    const onCloseModal = () => {
        setShow(false);
    };

    const onPayment = async () => {
        try {
            //  onPaymentOrder
            order.forEach(async (v) => {
                await onPaymentOrder(v._id);
            });
            await loadTable();
            await orderTable(tableId);
            setTableId('');
            onCloseModal();
            notification.success({
                message: 'Payment success',
            });
        } catch (error) {
            console.log('error', error);
            notification.error({
                message: 'Payment error',
            });
        }
    };

    const orderTable = async (tableId) => {
        try {
            const data = await getOrder(tableId);
            setTableId(tableId);
            setOrder([...data.orders]);
        } catch (error) {
            console.log('data.error', error);
        }
    };

    const ShowItems = () => {
        return (
            <>
                {order.map((data, index) => {
                    return (
                        <div key={index}>
                            <div
                                style={{
                                    marginTop: 10,
                                    marginBottom: 5,
                                }}
                            >
                                <h5>Status: {order[index].status}</h5>
                            </div>
                            <Card
                                key={index}
                                hoverable
                                title={`Order No.${data._id}`}
                            >
                                {data.products.map((menu, index) => {
                                    return (
                                        <Row key={index}>
                                            <Col>
                                                <img
                                                    src={`${HOST}/${menu.product.photo}`}
                                                    alt="photoMenu"
                                                    style={{
                                                        height: 'auto',
                                                        width: '100px',
                                                        borderRadius: 5,
                                                        marginBottom: 5,
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            </Col>
                                            <Col>
                                                <div>
                                                    <h5
                                                        style={{marginLeft: 10}}
                                                    >
                                                        {menu.product.name}
                                                    </h5>
                                                </div>
                                            </Col>
                                            <Col>
                                                <h5 style={{marginLeft: 10}}>
                                                    quantity: {menu.quantity}{' '}
                                                </h5>
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </Card>
                        </div>
                    );
                })}
                <hr />
                <div style={{marginTop: 10}}>
                    <NumberFormat
                        value={getTotal()}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'NT$ '}
                        renderText={(value) => <h2>Total : {value} TWD</h2>}
                    />
                </div>
                {isAuthenticated()&&isAuthenticated().user.role === 'admin' && (
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => onShowModal()}
                >
                    Payment
                </button>
                )}
                {isAuthenticated()&&isAuthenticated().user.role === 'staff' && (
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => onShowModal()}
                >
                    Payment
                </button>
                )}
            </>
        );
    };

    const noOrder = () => <h2>No Order</h2>;

    const getTotal = () => {
        return order.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.amount;
        }, 0);
    };

    const AllTable = () => (
        <>
            <Row>
                <Card
                    bordered={true}
                    style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        width: '100%',
                    }}
                    title="Table"
                >
                    <Row>
                        {tables.map((data, index) => {
                            const isOrder = data.cart.status;
                            return (
                                <Col
                                    lg={6}
                                    md={12}
                                    xs={24}
                                    key={index}
                                    style={{padding: 10}}
                                >
                                    <Button
                                        style={{
                                            height: '100px',
                                            width: '100%',
                                            borderRadius: 15,
                                            backgroundColor: isOrder
                                                ? 'red'
                                                : 'green',
                                            color: 'white',
                                        }}
                                        onClick={() => orderTable(data._id)}
                                    >
                                        {data.name}
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Card>
            </Row>
            <br />
            <Row>
                <Card
                    bordered={true}
                    style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        width: '100%',
                    }}
                    title="Order"
                >
                    <>{order.length > 0 ? ShowItems() : noOrder()}</>
                </Card>
            </Row>
        </>
    );

    useEffect(() => {
        loadTable();
    }, []);

    return (
        <div className="container-fluid">
            {show && (
                <Modal visible={show} onCancel={onCloseModal} onOk={onPayment}>
                    <h4>Are you sure you want to make this report?</h4>
                    <hr />
                    <p>
                        If you press the OK button, the information cannot be
                        edited.
                    </p>
                </Modal>
            )}
            {AllTable()}
        </div>
    );
};

export default ManageOrder;
