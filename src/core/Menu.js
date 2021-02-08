import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import MK from "../image/MK.png";
import CardMenu from "./CardMenu";
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
      <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={MK} alt="First slide" />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={MK} alt="First slide" />
          </Carousel.Item>
      </Carousel>

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
      </div>
    </div>
  );
};

export default Home;
