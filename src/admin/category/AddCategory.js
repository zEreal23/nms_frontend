import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { createCategory } from "../apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectToReferrer , setredirectToReferrer] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setredirectToReferrer(true)
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
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
        return <Redirect to="/manage/product"/>;
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
      {redirectUser()}
    </form>
  );

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {newCategoryFom()}
      </div>
    </div>
  );
};

export default AddCategory;
