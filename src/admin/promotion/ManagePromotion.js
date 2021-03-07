import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Card, Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

import { isAuthenticated } from "../../auth";
import { getPromotion, deletePromotion,updatePromotion} from "../apiAdmin";
import "../../admin/Menu/ManageStyle.css";

const ManagePromotion = () => {
  const [promotions, setpromotions] = useState([]);

  const { user, token } = isAuthenticated();

  const loadMenu = () => {
    getPromotion().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setpromotions(data);
        console.log(data)
        //console.log(data[0].category.name);
      }
    });
  };

  const destroy = (promotionId) => {
    deletePromotion(promotionId, user._id, token).then((data) => {
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
      title: "name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Discription",
      dataIndex: "dc",
      width: 150,
    },
    {
        title:"manage",
        dataIndex:"manage",
    }
   
  ];

  const tableData = [];
  {
    promotions.map((data, index) => {
      tableData.push({
        key: index,
        id: `${data._id}`,
        name: `${data.name}`,
        dc: `${data.dc}`,
        manage: (
          <>
            <Link to={`/Manage/promotion/update/${data._id}`}>
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
      <Card hoverable title={`Total ${promotions.length} Promotion`} 
      extra={
        <div style={{ margin: 10 }}>
          <Link to="/create/promotion">
          <span
            type="button"
            className="btn btn-outline-success"
            style={{ marginLeft: 10 }}
            
          >
            Add Promotion
          </span>
          </Link>
        </div>
      }
      style={{ borderColor: "#eee", borderRadius: 30, marginTop:5}}>
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

export default ManagePromotion;