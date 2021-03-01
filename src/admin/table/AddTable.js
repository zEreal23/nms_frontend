import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import {  getAllTable , createTable } from "../apiAdmin";

const AddTable = () => {
  const [noTable, setNoTable] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectToReferrer, setredirectToReferrer] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setNoTable(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createTable(user._id, token, { noTable }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setredirectToReferrer(true)
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
        return <Redirect to="/admin/table"/>;
    }
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

  const createTableForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">NO. Table</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={noTable}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Table</button>
      {redirectUser()}
    </form>
  );
  
  
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {createTableForm()}
      </div>
    </div>
  );
};

export default AddTable;
