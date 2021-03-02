import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CardMenu from "./CardMenu";
import { getCart } from "./CartOrder";
import Checkout from "./Checkout";
import { getTable } from "../admin/apiAdmin";
const Cart = ({match}) => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [Table, setNotable] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {
    init(match.params.tableId)
    setItems(getCart());
  }, [run]);

  const ShowItems = (items) => {
    return (
      <div>
        <h2>Order {`${items.length}`} items</h2>
        {items.map((product, i) => (
          <CardMenu
            key={i}
            product={product}
            ShowAddtoCartButton={false}
            ShowRemoveProductButton={true}
            cartUpdate={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
  const noOrder = () => (
    <h2>
      Your don't have any Food order
      <br />
      <Link to="/Menu"></Link>{" "}
    </h2>
  );
  
  const init = (tableId) => {
    getTable(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNotable(data);
      }
    });
  };

  return (
    <div className="container">
      <div className="row" style={{ flex: 1 , justifyContent: "center" , alignItems: "center"}}>
        <div className="col-6">
          {items.length > 0 ? ShowItems(items) : noOrder()}
          <hr />
          <p>{Table.noTable}</p>
          <h2 className="mb-4">Summary</h2>
          <Checkout products={items} tableId={Table._id} />
          <hr />
        </div>
      </div>
    </div>
  );
};
export default Cart;
