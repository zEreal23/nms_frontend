import React, { useEffect, useState } from "react";

import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
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
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center" style={{ marginTop: 10 }}>
            Total {products.length} Menus
          </h2>
          <hr />
          {products.map((p, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ margin: 10 }}
            >
              <strong style={{ marginRight: 10 }}>{p.name}</strong>
              <Link to={`/admin/product/update/${p._id}`}>
                <span
                  className="badge badge-warning bage-pill"
                  style={{ marginRight: 10 }}
                >
                  Update
                </span>
              </Link>
              <span
                onClick={() => destroy(p._id)}
                className="badge badge-danger badge-pill"
              >
                Delete
              </span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
