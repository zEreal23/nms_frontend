import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Drawer, Card, Table} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import {isAuthenticated} from '../../auth';
import {API, HOST} from '../../config';
import {getProducts, deleteProduct} from '../apiAdmin';
import ShowImage from '../../core/ShowImage';
import '../../admin/Menu/ManageStyle.css';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const loadMenu = () => {
        getProducts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setProducts(data);
                console.log(data);
                //console.log(data[0].category.name);
            }
        });
    };

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadMenu();
            }
        });
    };

    const columns = [
        {
            title: 'photo',
            dataIndex: 'photo',
            width: '10%',
        },
        {
            title: 'category',
            dataIndex: 'category',
            width: 150,
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'price',
            dataIndex: 'price',
            width: 150,
        },
        {
            title: 'sold',
            dataIndex: 'sold',
            width: 150,
        },
        {
            title: 'manage',
            dataIndex: 'manage',
            width: 150,
        },
    ];

    const tableData = [];
    {
        products.map((data, index) => {
            tableData.push({
                key: index,
                photo: (
                    <div className="product-img">
                        <img
                            src={`${HOST}/${data.photo}`}
                            alt={data.name}
                            style={{
                                height: '100px',
                                width: '70px',
                                borderRadius: '10%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                ),
                category: `${data.category.name}`,
                name: `${data.name}`,
                price: `${data.price}`,
                sold: `${data.sold}`,
                manage: (
                    <>
                        <Link to={`/Manage/product/update/${data._id}`}>
                            <span
                                type="button"
                                className="btn btn-primary"
                                style={{marginRight: 10}}
                            >
                                <EditOutlined />
                            </span>
                        </Link>
                        <button
                            onClick={() => destroy(data._id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <DeleteOutlined />
                        </button>
                    </>
                ),
            });
        });
    }

    useEffect(() => {
        loadMenu();
    }, []);

    return (
        <div className="container-fluid">
            <Card
                hoverable
                title={`Total ${products.length} Menu`}
                extra={
                    <div style={{margin: 10}}>
                        <Link to="/create/product">
                            <span
                                type="button"
                                className="btn btn-outline-success"
                                style={{marginLeft: 10}}
                            >
                                Add Menu
                            </span>
                        </Link>
                    </div>
                }
                style={{borderColor: '#eee', borderRadius: 30, marginTop: 5}}
            >
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{pageSize: 5}}
                    style={{margin: 5}}
                />
            </Card>
        </div>
    );
};

export default ManageProduct;
