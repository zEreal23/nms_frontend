import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

import { API } from "../config";
import { getCart, deleteCart, postOder } from "./apiCore";
import { getTable } from "../admin/apiAdmin";

const CartPage = ({ match }) => {
  const [menu, setData] = useState([]);
  const [noTable, setNotable] = useState([]);
  const [error, setError] = useState(false);

  const loadCart = (tableId) => {
    getCart(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setData(data.products);
        console.log("cart", data);
      }
    });
  };

  const init = (tableId) => {
    getTable(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNotable(data);
        console.log("2", data);
      }
    });
  };

  const createOrder = (tableId, amount) => {
    postOder(tableId, amount).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCart(tableId);
      }
    });
  };

  const delCart = (productId, tableId) => {
    deleteCart(productId, tableId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCart(tableId);
      }
    });
  };

  const ShowItems = () => {
    return (
      <div>
        <h2>Order {`${menu.length}`} items</h2>
        {menu.map((p, index) => (
          <table className="table text-center" style={{ left: 0, right: 0 }}>
            <tbody>
              <tr key={index}>
                <td style={{ width: "25%" }}>
                  <img
                    src={`${API}/product/photo/${p.productId._id}`}
                    alt="photoMenu"
                    className="rounded-circle"
                    style={{
                      height: "50px",
                      width: "auto",
                      borderRadius: "10%",
                    }}
                  />
                </td>
                <td style={{ width: "20%" }}>
                  <h5>{p.productId.name}</h5>
                </td>
                <td>
                  <div
                    className="input-group text-center mb-2"
                    style={{ width: "25%" }}
                  >
                    <p>{p.quantity}</p>
                  </div>
                </td>
                <td>
                <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => delCart(p.productId._id, noTable._id)}
                      style={{ marginLeft: 5 }}
                    >
                      <DeleteOutlined style={{ fontSize: 20 }} />
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  };

  const noChact = () => (
    <h2>
      Your don't have any food in chart
      <br />
      <Link to={`/Menu/${noTable._id}`}></Link>{" "}
    </h2>
  );

  const getTotal = () => {
    return menu.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.quantity * nextValue.productId.price;
    }, 0);
  };

  useEffect(() => {
    loadCart(match.params.tableId);
    init(match.params.tableId);
  }, []);

  return (
    <div>
      <Link to={`/Menu/${noTable._id}`} style={{ top:17,left:10 , position: "fixed"}}>
        <LeftOutlined style={{ fontSize: "22px", color: "black" }} />
      </Link>
      {menu.length > 0 ? ShowItems() : noChact()}
      <div style={{ bottom: 0, position: "fixed", right: 0, left: 0 ,backgroundColor:'white'}}>
        <hr />
        <NumberFormat
          value={getTotal()}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"NT$"}
          renderText={(value) => <h3>Total : {value} TWD</h3>}
        />

        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => createOrder(noTable._id, getTotal())}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
