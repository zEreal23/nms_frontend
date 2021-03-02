import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

import MK from "../image/MK.png";
import CardMenu from "./CardMenu";
import { getProducts } from "./apiCore";
import { getTable } from "../admin/apiAdmin";
import { itemTotal } from "./CartOrder";

const Home = ({ match }) => {
  const [productsByArrial, setProductsByArrival] = useState([]);
  const [noTable, setNotable] = useState([]);
  const [error, setError] = useState(false);

  const loadProductArrival = (tableId) => {
    getProducts(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  const init = (tableId) => {
    getTable(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNotable(data.noTable);
      }
    });
  };

  useEffect(() => {
    loadProductArrival(match.params.tableId);
    init(match.params.tableId);
  }, []);

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <h1>No. {noTable}</h1>
      <img className="d-block w-100" src={MK} alt="First slide" />
      <h2 className="mb-4" style={{ textAlign: "center", margin: 10 }}>
        Menu
      </h2>

      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productsByArrial.map((product, i) => (
          <CardMenu key={i} product={product} />
        ))}
        <div style={{ bottom: 10, position: "fixed" }}>
          <Link to="/cart" style={{ marginRight: 10}}>
            <span
              type="button"
              className="btn btn-outline-success"
              style={{width:'100%' }}
            >
               Your Order{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
