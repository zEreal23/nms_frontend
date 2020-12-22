import React, { useEffect, useState } from "react";

import MK from "../image/MK.png";
import Card from "../core/Card";
import { getProducts } from "./apiCore";

const Home = () => {
  const [productsByArrial, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductArrival = () => {
    getProducts("createAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductArrival();
  }, []);

  return (
    <div className="container">
      <img
        src={MK}
        className="rounded mx-auto d-block img-fluid"
        alt="Responsive"
      />
       <h2 className="mb-4" style={{textAlign:'center'}}>Menu</h2>
      <div className="row" style={{display:'flex' ,justifyContent: 'center' ,alignItems:'center'}}>
        {productsByArrial.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
