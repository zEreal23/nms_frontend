import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { getPromotion,updatePromotion } from "../apiAdmin";

const UpdatePromotion = ({ match }) => {
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
    redirectToProfile,
  } = values;

  const init = (promotionId) => {
    getPromotion(promotionId).then((data) => {
      console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          dc: data.dc,
          formData: new FormData(),
        });
      }
    });
  };

  // load categories and set form data


  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updatePromotion(match.params.promotionId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            photo: "",
            dc: "",
            loading: false,
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit} style={{ width: 500 }}>
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

      <button className="btn btn-outline-primary" style={{ marginRight: 10 }}>
        Update Promotion
      </button>
      <Link to={"/Manage/update"}>
        <span
          type="button"
          className="btn btn-outline-warning"
          style={{ marginRight: 10 }}
        >
          Back
        </span>
      </Link>
    </form>
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
        return <Redirect to="/Manage/promotion" />;
      }
    }
  };

  return (
    <div className="row">
      <div
        className="col-md-8 offset-md-2"
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
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

export default UpdatePromotion;