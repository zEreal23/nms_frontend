import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Tabs, Spin, message} from 'antd';
import Slider from 'react-slick';
import {LoadingOutlined} from '@ant-design/icons';

import p1 from '../image/p1.jpg';
import {getProducts, postCart} from './apiCore';
import {getTable} from '../admin/apiAdmin';
import {HOST} from '../config';

import './Menu.css';

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
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const Home = ({match}) => {
    const [productsByArrial, setProductsByArrival] = useState([]);
    const [noTable, setNotable] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadProductArrival = (tableId) => {
        getProducts(tableId).then((data) => {
            if (data.error) {
            } else {
                setProductsByArrival(data);
                setLoading(false);
            }
        });
    };

    const init = (tableId) => {
        getTable(tableId).then((data) => {
            if (data.error) {
            } else {
                setNotable(data);
            }
        });
    };

    useEffect(() => {
        loadProductArrival(match.params.tableId);
        init(match.params.tableId);
    }, []);

    const addToCart = async (product, tableId) => {
        setLoading(true);
        try {
            await postCart(product, tableId);
            //init(tableId);
            setLoading(false);
            message.success('Add to Card Success');
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Can't add to Card, Please try again");
        }
    };

    const content = () => (
        <div className="menu-container">
            {productsByArrial.map((product, i) => (
                <Card key={i}>
                    <Row>
                        <Col span={24}>
                            <img
                                src={`${HOST}/${product.photo}`}
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
                            <span className="text-menu-user">
                                {product.name}
                            </span>
                        </Col>
                        <Col
                            span={6}
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
                                style={{opacity: loading ? 0.5 : 1}}
                                className="btn btn-outline-warning mt-2 mb-2"
                                style={{width: '100%'}}
                                disabled={loading}
                            >
                                Select
                            </button>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    );

    return (
        <div style={{marginTop: 40}}>
            <h2>Table No. {noTable.name}</h2>
            <div className="App">
                <Slider {...settings}>
                    {[1, 2, 3, 4, 5].map((value, index) => {
                        return (
                            <div className="card-image-pomo" key={index}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                    src={p1}
                                    alt="p1"
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>

            <br />
            <hr />

            {content()}
            <Link to={`/cart/${match.params.tableId}`}>
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    style={{bottom: 0, position: 'fixed', right: 0, left: 0}}
                >
                    Cart
                </button>
            </Link>
        </div>
    );
};

export default Home;
