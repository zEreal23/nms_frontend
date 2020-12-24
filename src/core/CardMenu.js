import React from "react";
import { Card } from "antd";

import ShowImage from "./ShowImage";

const CardMenu = ({ product }) => {
  return (
    <Card
      title={product.name}
      extra={<a href="#">More</a>}
      style={{ width: 300, margin: 10 }}
    >
      <ShowImage item={product} url="product" />
      <p>Price :{product.price}</p>
    </Card>
  );
};

export default CardMenu;
