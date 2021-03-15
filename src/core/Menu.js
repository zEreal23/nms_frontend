import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Tabs,Spin, message} from 'antd';
import Slider from 'react-slick';
import { LoadingOutlined } from '@ant-design/icons';

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
        console.log('added');
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
        
        /*postCart(product, tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                init(tableId);
                setLoading(true)
            }
        });*/
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
            {loading ? loadingPage() :tab()}
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
