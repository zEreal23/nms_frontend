import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Tabs} from 'antd';
import Carousel from 'react-elastic-carousel';
import Slider from 'react-slick';

import p1 from '../image/p1.jpg';
import Item from './item';
import {getProducts, postCart} from './apiCore';
import {getTable} from '../admin/apiAdmin';
import {API, HOST} from '../config';

import './Menu.css';
const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1200, itemsToShow: 4},
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const promotionStyle = {
    height: '160px',
    width: 'auto',
    borderRadius: 20,
    margin: 10,
};

const Home = ({match}) => {
    const [productsByArrial, setProductsByArrival] = useState([]);
    const [noTable, setNotable] = useState([]);
    const [cartNumber, setcartNumber] = useState([]);
    const [error, setError] = useState(false);

    const loadProductArrival = (tableId) => {
        getProducts(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                console.log('2', data);
            }
        });
    };

    const init = (tableId) => {
        getTable(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setNotable(data);
                setcartNumber(data.cart.items.length);
            }
        });
    };

    useEffect(() => {
        loadProductArrival(match.params.tableId);
        init(match.params.tableId);
    }, []);

    const addToCart = (product, tableId) => {
        console.log('added');
        postCart(product, tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                init(tableId);
            }
        });
    };

    const {TabPane} = Tabs;
    const tab = () => (
        <Tabs defaultActiveKey="1">
            <TabPane tab="จานเดียว" key="1">
                <div>
                    {productsByArrial.map((product, i) => (
                        <Card key={i}>
                            <Row>
                                <Col span={24}>
                                    <img
                                        src={`${HOST}/${product.photo}`}
                                        alt="photoMenu"
                                        style={{
                                            height: 'auto',
                                            width: '100%',
                                            borderRadius: '5px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className="text-menu-user">
                                        {product.name}
                                    </span>
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className="text-menu-user">
                                        {product.price}
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <button
                                        onClick={() =>
                                            addToCart(product._id, noTable._id)
                                        }
                                        className="btn btn-outline-warning mt-2 mb-2"
                                        style={{width: '100%'}}
                                    >
                                        Select
                                    </button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </div>
            </TabPane>
            <TabPane tab="ชุดเซ็ต" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    );

    return (
        <div className="container" style={{marginTop: 20}}>
            <h1>Table No. {noTable.name}</h1>
            <div className="App">
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
            <hr />

            {tab()}
            <Link to={`/cart/${match.params.tableId}`}>
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    style={{bottom: 0, position: 'fixed', right: 0, left: 0}}
                >
                    Cart{' '}
                </button>
            </Link>
        </div>
    );
};

export default Home;
