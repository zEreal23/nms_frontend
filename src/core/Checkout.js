import React, { useEffect, useState } from "react";

import CardMenu from "./CardMenu";
import { getProducts } from "./apiCore";

const Checkout = ({products})=>{
    const getTotal = () =>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        },0)
    }
    return(
    <div>
        <h3>Total : {getTotal()}TWD</h3>
        <button className="btn btn-success">Confirm</button>
    </div>
    )
}
export default Checkout;