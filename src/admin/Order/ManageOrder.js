import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import NumberFormat from "react-number-format";

import { isAuthenticated } from "../../auth";
import { getAllTable } from "../apiAdmin";
import { getOrder } from "../../core/apiCore";
import { API } from "../../config";

const ManageOrder = () => {
  const [tables, setTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const loadTable = () => {
    getAllTable().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTable(data);
        console.log(data);
      }
    });
  };

  const orderTable = (tableId) => {
    getOrder(tableId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data.orders);
        console.log("1", data.orders);
      }
    });
  };

  const ShowItems = () => {
    return (
      <>
        {order.map((data, index) => (
          <Card key={index} hoverable>
            <h5>Order No. {data._id}</h5>
            {data.products.map((menu, index) => (
              <Card key={index}>
                <Row>
                  <Col>
                    <img
                      src={`${API}/product/photo/${menu.product._id}`}
                      alt="photoMenu"
                      className="rounded-circle"
                      style={{
                        height: "50px",
                        width: "auto",
                        borderRadius: "10%",
                      }}
                    />
                  </Col>
                  <Col>
                    <h5 style={{ marginLeft: 10 }}>{menu.product.name}</h5>
                  </Col>
                  <Col>
                    <h5 style={{ marginLeft: 10 }}>quantity: {menu.quantity}</h5>
                    <h5>amount: {data.amount}</h5>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        ))}
          <NumberFormat
            value={getTotal()}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"NT$ "}
            renderText={(value) => <h2>Total : {value} TWD</h2>}
          />
      </>
    );
  };

  const noOrder = () => (
    <h2>
      Table don't have order
    </h2>
  );

  const getTotal = () => {
    return order.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.amount;
    }, 0);
  };

  const AllTable = () => (
    <Row>
      <Card
        bordered={true}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          width: "45%",
          margin: 10,
        }}
        hoverable
        title="Table"
      >
        <Row gutter={[8, 16]}>
          {tables.map((data, index) => (
            <Col span={6} key={index}>
              <Button
                style={{ height: "100px", width: "100%", borderRadius: 15 }}
                onClick={() => orderTable(data._id)}
              >
                {data.name}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <Card
        bordered={true}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          width: "45%",
          margin: 10,
        }}
        title="Order"
        hoverable
      >
        <>
          {order.length > 0 ? ShowItems() : noOrder()}
        </>
      </Card>
    </Row>
  );

  useEffect(() => {
    loadTable();
  }, []);
  return <div>{AllTable()}</div>;
};

export default ManageOrder;
