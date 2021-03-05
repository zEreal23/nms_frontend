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
        setNotable(data.name);
      }
    });
  };

  useEffect(() => {
    loadProductArrival(match.params.tableId);
    init(match.params.tableId);
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h1>Table No. {noTable}</h1>
      <img className="d-block" style={{width:'100%'}} src={MK} alt="First slide" />
      <h2 className="mb-4" style={{ textAlign: "center", margin: 10 }}>
        Menu
      </h2>
      <button type="button" className="btn btn-outline-secondary">Secondary</button>
      <button type="button" className="btn btn-outline-secondary">Secondary</button>
      <div>
        {productsByArrial.map((product, i) => (
          <CardMenu key={i} product={product} />
        ))}
      </div>
          <Link to= {`/cart/${match.params.tableId}`} >
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              style={{ bottom: 10, position:'fixed' , right:0 , left:0}}
            >
               Your Order{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
            </button>
          </Link>
    
    </div>
  );
};

export default Home;
