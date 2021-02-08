import React, { useState } from "react";
import { Card } from "antd";
import { Link, Redirect } from "react-router-dom";

import ShowImage from "./ShowImage";
import { addItem, removeItem, updateItem } from "./CartOrder";

const CardMenu = ({
  product,
  ShowAddtoCartButton = true,
  cartUpdate = false,
  ShowRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/Menu" />;
    }
  };

  const ShowAddtoCart = (ShowAddtoCartButton) => {
    return (
      ShowAddtoCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Select
        </button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mb-2"
          style={{ width: "100%"}}
        >
          Remove
        </button>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const ShowCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="input-group text-center mb-2" style={{ width: '100%'}}>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  return (
    <div>
      {shouldRedirect(redirect)}
      <Card
        title={product.name}
        style={{ width: 300, margin: 10 , borderRadius:20 , borderWidth:1 , borderColor:'black'}}
      >
        <ShowImage item={product} url="product" />
        <p>Price :{product.price}TWD</p>
        {ShowAddtoCart(ShowAddtoCartButton)}
        {ShowCartUpdateOptions(cartUpdate)}
        {showRemoveButton(ShowRemoveProductButton)}
      </Card>
    </div>
  );
};
export default CardMenu;
