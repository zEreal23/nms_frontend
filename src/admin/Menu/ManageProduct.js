import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Card, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { isAuthenticated } from "../../auth";
import {API} from '../../config' 
import { getProducts, deleteProduct } from "../apiAdmin";
import ShowImage from "../../core/ShowImage";
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
        console.log(data);
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
      title: "photo",
      dataIndex: "photo",
      width: '10%',
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
        photo: (
          <div className="product-img container text-center">
            <img
              src={`${API}/product/photo/${data._id}`}
              alt={data.name}
              className="mb-3"
              style={{ height: "50px", width: "auto", borderRadius: "10%" }}
            />
          </div>
        ),
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
                <EditOutlined />
              </span>
            </Link>
            <button
              onClick={() => destroy(data._id)}
              type="button"
              className="btn btn-danger"
            >
              <DeleteOutlined />
            </button>
          </>
        ),
      });
    });
  }

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div>
      <Card
      hoverable
        title={`Total ${products.length} Menu`}
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
        style={{ borderColor: "#eee", borderRadius: 30, marginTop: 5 }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          style={{ margin: 5}}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
