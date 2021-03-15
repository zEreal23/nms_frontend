import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Tabs,Spin, message} from 'antd';
import Slider from 'react-slick';
import { LoadingOutlined } from '@ant-design/icons';

import p1 from '../image/p6.jpg'; 
import p2 from '../image/p2.jpg';
import p3 from '../image/p3.jpg'; 
import p4 from '../image/p8.jpeg';
import p5 from '../image/p9.jpg';
import {getProducts, postCart} from './apiCore';
import {getTable} from '../admin/apiAdmin';
import {HOST} from '../config';

import './Menu.css';

const promotion = [
    {
        no: 1,
        img: p1,
    },
    {
        no: 2,
        img: p2,
    },
    {
        no: 3,
        img: p3,
    },
    {
        no: 4,
        img: p4,
    },
    {
        no: 5,
        img: p5,
    },

]

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
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
    const [cartNumber, setcartNumber] = useState([]);
    const [error, setError] = useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const loadProductArrival = (tableId) => {
        getProducts(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                console.log('2', data);
                setLoading(false)
            }
        });
    };

    const loadingPage = () => (
        <Spin indicator={antIcon} />
    )

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

    const addToCart = async(product, tableId) => {
        setLoading(true)
        try{
            await postCart(product, tableId)
            //init(tableId);
            setLoading(false)
            message.success("Add to Card Success")
        } catch (error) {
            setError(error);
            setLoading(false)
            console.log(error)
            message.error("Can't add to Card, Please try again");
        }
    };

    const content = () => (
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
    );

    return (
        <div style={{marginTop: 20}}>
            <h1>Table No. {noTable.name}</h1>
            <div className="App">
                <Slider {...settings}>
                    {promotion.map((value, index) => {
                        return (
                            <div className="card-image-pomo" key={index}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                    src={value.img}
                                    alt="p1"
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>

            {content()}
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
