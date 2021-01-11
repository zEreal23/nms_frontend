import React, { useEffect, useState } from "react";

import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../apiAdmin";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        console.log(data[0].category.name);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
      className=" row d-flex justify-content-center"
    >
      <div className="col ">
        <h2 style={{ marginTop: 10 }}>Total {products.length} Menus</h2>
      </div>

      <div>
        <Link to="/create/product">
          <span type="button" className="btn btn-outline-success">
            Add New Menu
          </span>
        </Link>
      </div>
      <hr />

      <table className="table text-center col-12">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        {products.map((m, i) => (
          <tbody>
            <tr key={i}>
              <td>{m.category.name}</td>
              <td>{m.name}</td>
              <td>{m.price}</td>
              <td>
                {" "}
                <Link to={`/admin/product/update/${m._id}`}>
                  <span
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </span>
                </Link>
                <button
                  onClick={() => destroy(m._id)}
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
};

export default ManageProduct;
