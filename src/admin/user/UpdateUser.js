import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getUser, updateUser } from "../apiAdmin";

const UpdateUser = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const init = (userEidtId) => {
    console.log("User "+userEidtId)
    console.log ("Admin "+user._id)
    getUser(userEidtId).then((data) => {
      console.log(data)
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    init(match.params.userEidtId);
    console.log(match.params.userEidtId);
  }, []);

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");
    updateUser(match.params.userEidtId, user._id, token, { name })
    .then((data) => {
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
        Update User
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

export default UpdateUser;
