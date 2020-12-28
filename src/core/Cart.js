import React, { useEffect, useState } from "react";
import {Link}from "react-router-dom";
import CardMenu from "./CardMenu";
import { getCart } from "./CartOrder";
import Checkout from "./Checkout";
const Cart =()=>{
    const [items,setItems] = useState([])
    const [run, setRun] = useState(false);
    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const ShowItems= items =>{
        return(
            <div>
                <h2>Your FoodOrder has {`${items.length}` }items</h2><hr/>
                {items.map((product,i)=>(
                <CardMenu key={i} product={product}                 
                ShowAddtoCartButton={false}
                ShowRemoveProductButton={true}
                cartUpdate={true}
                setRun={setRun}
                run={run}
                />
                ))}
                </div>
        )
    }
    const noOrder = ()=>(
        <h2>Your not have any Foodorder<br/><Link to="/home"></Link> </h2>
    );

    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    {items.length>0 ?ShowItems(items):noOrder()}
                    <h2 className="mb-4">Summary</h2><Checkout products={items}/><hr/>
                    
                 </div>

                 
            </div>
    </div>
    )
}
export default Cart;