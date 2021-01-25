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
      <Carousel style={{borderRadius:20, marginTop:30}}>
        <Carousel.Item>
          <img className="d-block w-100" src={MK} alt="First slide" style={{borderRadius:30}}/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
        <img className="d-block w-100" src={MK} alt="First slide" style={{borderRadius:30}}/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mb-4" style={{ textAlign: "center" , margin: 10 }}>
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
