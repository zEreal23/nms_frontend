import React, { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';

import CardMenu from "./CardMenu";
import { getProducts } from "./apiCore";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return (
    <div>
      <NumberFormat
        value={getTotal()}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => <h3>Total : {value} TWD</h3>}
      />
      <button className="btn btn-success">Confirm</button>
    </div>
  );
};
export default Checkout;
