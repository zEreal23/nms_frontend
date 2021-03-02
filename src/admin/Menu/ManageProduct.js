import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Card, Table } from "antd";

import { isAuthenticated } from "../../auth";
import { getProducts, deleteProduct } from "../apiAdmin";
import "../../admin/Menu/ManageStyle.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadMenu = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        //console.log(data[0].category.name);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadMenu();
      }
    });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "category",
      dataIndex: "category",
      width: 150,
    },
    {
      title: "name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "price",
      dataIndex: "price",
      width: 150,
    },
    {
      title: "manage",
      dataIndex: "manage",
      width: 150,
    },
  ];

  const tableData = [];
  {
    products.map((data, index) => {
      tableData.push({
        key: index,
        id: `${data._id}`,
        category: `${data.category.name}`,
        name: `${data.name}`,
        price: `${data.price}`,
        manage: (
          <>
            <Link to={`/Manage/menu/update/${data._id}`}>
              <span
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 10 }}
              >
                Edit
              </span>
            </Link>
            <button
              onClick={() => destroy(data._id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </>
        ),
      });
    });
  }

  const Demo = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
      className=" row d-flex justify-content-center"
    >
      <Link to={"/admin/home"}>
        <span
          type="button"
          className="btn btn-outline-dark"
          style={{ marginRight: 2, width: 100 }}
        >
          Back
        </span>
      </Link>
      <div className="col ">
        <h2 style={{ marginTop: 10 }}>Total {products.length} Menus</h2>
      </div>

      <div>
        <Link to="/create/product">
          <span type="button" className="btn btn-outline-success">
            Add New Menu
          </span>
        </Link>
      </div>
      <hr />

      <table className="table text-center col-12">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        {products.map((m, i) => (
          <tbody>
            <tr key={i}>
              <td>{m.category.name}</td>
              <td>{m.name}</td>
              <td>{m.price}</td>
              <td>
                {" "}
                <Link to={`/admin/product/update/${m._id}`}>
                  <span
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </span>
                </Link>
                <button
                  onClick={() => destroy(m._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div>
      <Card title={`Total ${products.length} Menu`} 
      extra={
        <div style={{ margin: 10 }}>
          <Link to="/create/product">
          <span
            type="button"
            className="btn btn-outline-success"
            style={{ marginLeft: 10 }}
            
          >
            Add Menu
          </span>
          </Link>
        </div>
      }
      style={{ borderColor: "#eee", borderRadius: 30, margin: 10}}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          style={{ margin: 5 }}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
