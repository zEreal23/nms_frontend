import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Drawer, Card, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getUsers, deleteUser } from "../apiAdmin";
import Staff from "../../image/user.png";
import CreateUsers from "../../user/signup";

import { isAuthenticated } from "../../auth";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    console.log(visible);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const destroy = (userId) => {
    const { token } = isAuthenticated();
    deleteUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  const delConfirmed = (userId) => {
    let answer = window.confirm("Are you sure want to delete?", userId);
    if (answer) {
      destroy(userId);
    }
  };

  const loadUsers = () => {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "role",
      dataIndex: "role",
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
    users.map((data, index) => {
      tableData.push({
        key: index,
        id: `${data._id}`,
        name: `${data.name}`,
        role: `${data.role}`,
        manage: (
          <>
            <Link to={`/Manage/user/update/${data._id}`}>
              <span
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 10 }}
              >
                <EditOutlined />
              </span>
            </Link>
            <button
              onClick={() => delConfirmed(data._id)}
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

  return (
    <div className="container-fluid">
      <Drawer
        title="Staff"
        placement="right"
        closeable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        store={{ position: "absolute" }}
      >
        <div>
          <CreateUsers />
        </div>
      </Drawer>
      <Card
        hoverable
        title={`Total ${users.length} Staff`}
        extra={
          <div style={{ margin: 10 }}>
            <span
              type="button"
              className="btn btn-outline-success"
              style={{ marginLeft: 10 }}
              onClick={showDrawer}
            >
              Add Staff
            </span>
          </div>
        }
        style={{ borderColor: "#eee", borderRadius: 30, marginTop: 5 }}
      >
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

export default ManageUser;
