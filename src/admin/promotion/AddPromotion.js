import React, { useState, useEffect } from "react";

import { isAuthenticated } from "../../auth";

import { createPromotion, getCategories } from "../apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    dc:"",
    photo: "",
    loading: false,
    error: "",
    createPromotion: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    dc,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
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
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createPromotion(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
         dc:"",
          loading: false,
          error: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <div className="card" style={{width:"auto", margin:10}}>
      <div className="card-body">
        <form className="mb-3" onSubmit={clickSubmit}>
          <h4>Post Photo</h4>
          <div className="form-group">
            <label className="btn btn-secondary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>
          
          <div className="form-group">
            <label className="text-muted">discription</label>
            <input
              onChange={handleChange("dc")}
              type="text"
              className="form-control"
              value={dc}
            />
          </div>



        
        

          <button className="btn btn-outline-primary">Create Promotion</button>
        </form>
      </div>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
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