import React, { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';

import CardMenu from "./CardMenu";
import { getProducts,createOrder } from "./apiCore";
import { emptyCart } from './CartOrder';

const Checkout = ({ products,tableId }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  
  
  const pick = () => {
    setData({ loading: true })
    let nonce;
    let deliveryAddress = data.address;
    emptyCart(()=>{
      console.log('success order')
  })
    const createOrderData = {
      products: products,
      address: deliveryAddress
  };
    createOrder(tableId,createOrderData)
    
  }

  return (
    <div>
      <NumberFormat
        value={getTotal()}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => <h3>Total : {value} TWD</h3>}
      />
     
<p>{tableId}</p>
      <button onClick={pick} className="btn btn-success">Confirm</button>
    </div>
  );
};
export default Checkout;
