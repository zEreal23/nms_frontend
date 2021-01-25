import React, { useEffect, useState } from "react";
import { Drawer } from "antd";

import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getCategories, deleteCategory } from "../apiAdmin";
import "../Menu/ManageStyle.css";
import AddCategory from "./AddCategory";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    console.log(visible);
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

  const Demo = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
      className=" row d-flex justify-content-center"
    >
      <Link to={'/admin/home'}>
        <span
          type="button"
          className="btn btn-outline-dark"
          style={{ marginRight: 2 ,width: 100  }}
        >
          Back
        </span>
      </Link>
      <div className="col ">
        <h2 style={{ marginTop: 10 }}>Total {categories.length} Categories</h2>
      </div>

      <div>
        <span
          type="button"
          className="btn btn-outline-success"
          onClick={showDrawer}
        >
          + Add
        </span>
      </div>

      <Drawer
        title="Category"
        placement="right"
        closeable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        store={{ position: "absolute" }}
      >
        <div>
          <AddCategory />
        </div>
      </Drawer>
      <hr />

      <table className="table text-center row-8">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        {categories.map((c, i) => (
          <tbody>
            <tr key={i}>
              <td>{c.name}</td>
              <td>
                <Link to={`/admin/category/update/${c._id}`}>
                  <span
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </span>
                </Link>

                <button
                  onClick={() => delCategory(c._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <Demo />
    </div>
  );
};

export default ManageCategory;
