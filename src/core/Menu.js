import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Tabs} from 'antd';

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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
        <div style={{marginTop: 20}}>
            <h1>Table No. {noTable.name}</h1>
            <div className="App">
                <Slider {...settings}>
                    <div style={{display:'flex',justifyContent:'center',alignItems: 'center', width: '100%',margin: 10}}>
                        <img style={{width: '100%',height:'auto',objectFit:'contain'}} src={p1} alt="p1"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems: 'center', width: '100%'}}>
                        <img style={{width: '100%',height:'auto',objectFit:'contain'}} src={p1} alt="p1"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems: 'center', width: '100%'}}>
                        <img style={{width: '100%',height:'auto',objectFit:'contain'}} src={p1} alt="p1"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems: 'center', width: '100%'}}>
                        <img style={{width: '100%',height:'auto',objectFit:'contain'}} src={p1} alt="p1"/>
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
