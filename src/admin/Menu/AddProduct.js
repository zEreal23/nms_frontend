import React, {useState, useEffect} from 'react';

import {isAuthenticated} from '../../auth';

import {createProduct, getCategories, uploadImages} from '../apiAdmin';
import axios from 'axios';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
    });

    const {user, token} = isAuthenticated();
    const {name, price, categories, category, loading, error, createdProduct, formData} = values;
    const previewImage = values.photo !== '' ? URL.createObjectURL(values.photo) : '';
    // load categories and set form data
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = (name) => (event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        if (name === 'photo') {
            formData.set(name, value);
        }
        setValues({...values, [name]: value});
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        try {
            const {name, price, category, formData, photo} = values;
            setValues({...values, error: '', loading: true});
            const pathImg = await uploadImages(formData, photo);
            const payload = {
                name: name,
                price: price,
                category: category,
                photo: pathImg,
            };
            await createProduct(user._id, payload);
            document.getElementById('photo').value = '';
            setValues({
                ...values,
                name: '',
                photo: '',
                price: '',
                loading: false,
                error: false,
                createdProduct: name,
            });
        } catch (error) {
            console.log(error);
            setValues({
                ...values,
                createdProduct: '',
                error: error?.data?.error ? error.data.error : 'something went wrong',
            });
        }
    };

    const newPostForm = () => (
        <div className="card" style={{width: 'auto', margin: 10}}>
            <div className="card-body">
                <form className="mb-3" onSubmit={clickSubmit}>
                    <h4>Post Photo</h4>
                    <div className="form-group">
                        {previewImage !== '' && (
                            <img
                                src={previewImage}
                                alt="previewImage"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    marginBottom: 10,
                                }}
                            />
                        )}
                        <label className="btn btn-secondary">
                            <input
                                id="photo"
                                onChange={handleChange('photo')}
                                type="file"
                                name="photo"
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={handleChange('name')}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Price</label>
                        <input
                            onChange={handleChange('price')}
                            type="number"
                            className="form-control"
                            value={price}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Category</label>
                        <select onChange={handleChange('category')} className="form-control">
                            <option>Please select</option>
                            {categories &&
                                categories.map((c, i) => (
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button className="btn btn-outline-primary">Create Product</button>
                </form>
            </div>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    );
};

export default AddProduct;
