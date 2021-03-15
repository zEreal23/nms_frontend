import React, {useEffect, useState} from 'react';
import {Drawer, Card, Table} from 'antd';
import {Link} from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import {isAuthenticated} from '../../auth';
import {getCategories, deleteCategory, createCategory} from '../apiAdmin';
import '../Menu/ManageStyle.css';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const delCategory = (categoryId) => {
        deleteCategory(categoryId, user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
            }
        });
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: 'Name',
            dataIndex: 'name',
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
        categories.map((data, index) => {
            tableData.push({
                key: index,
                id: `${data._id}`,
                name: `${data.name}`,
                manage: (
                    <>
                        <Link to={`/Manage/category/update/${data._id}`}>
                            <span
                                type="button"
                                className="btn btn-primary"
                                style={{marginRight: 10}}
                            >
                                <EditOutlined />
                            </span>
                        </Link>

                        <button
                            onClick={() => delCategory(data._id)}
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
        loadCategories();
    }, []);

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, {name}).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setSuccess(true);
                loadCategories();
            }
        });
    };

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Created done</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                    {error}
                </div>
            );
        }
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const AddCategory = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryFom()}
            </div>
        </div>
    );

    return (
        <div>
            <Drawer
                title="Category"
                placement="right"
                closeable={false}
                onClose={onClose}
                visible={visible}
                getContainer={false}
                store={{position: 'absolute'}}
            >
                <div>
                    <AddCategory />
                </div>
            </Drawer>

            <div className="container-fluid">
                <Card
                    hoverable
                    title={`Total ${categories.length} Categories`}
                    extra={
                        <div style={{margin: 10}}>
                            <span
                                type="button"
                                className="btn btn-outline-success"
                                onClick={showDrawer}
                            >
                                Add Category
                            </span>
                        </div>
                    }
                    style={{borderColor: '#eee', borderRadius: 30}}
                >
                    <div style={{width: 'auto'}}>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={{pageSize: 5}}
                            style={{margin: 5}}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ManageCategory;
