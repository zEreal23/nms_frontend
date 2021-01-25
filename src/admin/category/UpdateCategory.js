import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getCategory, updateCategory } from "../apiAdmin";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const init = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
    console.log(match.params.categoryId);
  }, []);

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setName("");
        }
      }
    );
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <h4>Edit Form</h4>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          style={{ width: 400 }}
        />
      </div>

      <button className="btn btn-outline-primary" style={{ marginRight: 10 }}>
        Update Category
      </button>

      <Link to={"/admin/product"}>
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

  return (
    <div className="row">
      <div className="col" 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}>{newPostForm()}</div>
    </div>
  );
};

export default UpdateCategory;
