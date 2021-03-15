import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import {isAuthenticated} from '../../auth';
import {Link} from 'react-router-dom';
import {getProduct, getCategories, updateProduct, uploadImages} from '../apiAdmin';
import { HOST } from '../../config';

const UpdateProduct = ({match}) => {
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
        formData: new FormData(),
    });

    const {user} = isAuthenticated();
    const {
        name,
        price,
        category,
        categories,
        photo,
        loading,
        error,
        createdProduct,
        formData,
        redirectToProfile,
    } = values;

    const previewImage =
        photo !== ''
            ? typeof photo === 'string'
                ? `${HOST}/${photo}`
                : URL.createObjectURL(photo)
            : '';

    const init = async (productId) => {
        try {
            const product = await getProduct(productId);
            const categories = await getCategories();
            setValues({
                ...values,
                name: product.name,
                photo: product.photo,
                price: product.price,
                category: product.category,
                categories: categories,
            });
        } catch (error) {
            console.log(error);
            setValues({
                ...values,
                error: error?.data?.error ? error.data.error : 'something went wrong',
            });
        }
    };

    useEffect(() => {
        init(match.params.productId);
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
            let pathImg = '';

            if (!!formData.entries().next().value) {
                pathImg = await uploadImages(formData);
            } else {
                pathImg = photo;
            }

            const payload = {
                name: name,
                price: price,
                category: category,
                photo: pathImg,
            };
            console.log('payload', payload);
            await updateProduct(match.params.productId, user._id, payload);
            setValues({
                ...values,
                name: '',
                photo: '',
                price: '',
                loading: false,
                error: false,
                redirectToProfile: true,
                createdProduct: name,
            });
        } catch (error) {
            console.log('error', error);
            setValues({
                ...values,
                createdProduct: '',
                loading: false,
                redirectToProfile: false,
                error: error?.data?.error ? error.data.error : 'something went wrong',
            });
        }
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit} style={{width: 500}}>
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
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                    value={category}
                >
                    <option>select category</option>
                    {categories.length > 0 &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <button className="btn btn-outline-primary" style={{marginRight: 10}}>
                Update Product
            </button>
            <Link to={'/admin/product'}>
                <span type="button" className="btn btn-outline-warning" style={{marginRight: 10}}>
                    Back
                </span>
            </Link>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/Manage/menu" />;
            }
        }
    };

    return (
        <div className="row">
            <div
                className="col-md-8 offset-md-2"
                style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
                {redirectUser()}
            </div>
        </div>
    );
};

export default UpdateProduct;
