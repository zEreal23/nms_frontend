import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {Card, Row, Col, message, Select} from 'antd';
import Slider from 'react-slick';

import p1 from '../image/p6.jpg';
import p2 from '../image/p2.jpg';
import p3 from '../image/p3.jpg';
import p4 from '../image/p8.jpeg';
import p5 from '../image/p9.jpg';
import {getProductsMenu, postCart} from './apiCore';
import {getTableMenu, getCategories} from '../admin/apiAdmin';
import {HOST} from '../config';

import './Menu.css';

const {Option} = Select;
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
];

const settings = {
    dots: true,
    infinite: true,
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

const Home = () => {
    const [productsByArrial, setProductsByArrival] = useState([]);
    const [noTable, setNotable] = useState([]);
    const [category, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const match = useRouteMatch();
    const tableId = match.params.tableId;

    const initialValues = async (tableId) => {
        try {
            const noTable = await getTableMenu(tableId);
            const dataProduct = await getProductsMenu(tableId);
            const dataCate = await getCategories();

            setCategories(dataCate);
            setNotable(noTable);
            setProductsByArrival(dataProduct);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialValues(tableId);
    }, [tableId]);

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

    const filterData =
        filterCategory !== 'all'
            ? productsByArrial.filter((v) => v.category._id === filterCategory)
            : productsByArrial;

    const content = () => (
        <div className="menu-container">
            {filterData.map((product, i) => (
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

    const onChangeCategory = (value) => {
        setFilterCategory(value);
    };

    return (
        <div style={{marginTop: 40}}>
            <h2>Table No. {noTable.name}</h2>
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
            <br />
            <hr />
            {/* filters */}
            <div className="filters-menu-user">
                <Select
                    defaultValue="all"
                    style={{width: 150}}
                    onChange={onChangeCategory}
                >
                    <Option value="all">All</Option>
                    {category.map((cat, index) => {
                        return (
                            <Option value={cat._id.toString()} key={index}>
                                {cat.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
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
