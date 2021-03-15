import React, { useEffect, useState } from "react";
import { Drawer, Card, Table } from "antd";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createTable } from "../apiAdmin";

import { isAuthenticated } from "../../auth";
import { getAllTable, deleteTable } from "../apiAdmin";
import "../Menu/ManageStyle.css";

const ManageTable = () => {
  const [tables, setTable] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    console.log(visible);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const loadTable = () => {
    getAllTable().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTable(data);
      }
    });
  };

  const delTable = (tableId) => {
    deleteTable(tableId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadTable();
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
      title: "QR code",
      dataIndex: "QR_code",
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
    tables.map((data, index) => {
      tableData.push({
        key: index,
        id: `${data._id}`,
        name: `${data.name}`,
        QR_code: (<QRCode value={`http://178.128.50.205:3021/menu/${data._id}`}/>),
        manage: (
          <>
            <Link to={`/menu/${data._id}`} target="_blank">
              <span
                type="button"
                className="btn btn-success"
                style={{ marginRight: 10 }}
              >
                Menu
              </span>
            </Link>
            <Link to={`/manage/table/update/${data._id}`}>
              <span
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 10 }}
              >
                <EditOutlined />
              </span>
            </Link>
            <button
              onClick={() => delTable(data._id)}
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

  const Demo = () => (
    <div className="container-fluid">
      <Card
        hoverable
        title={`Total ${tables.length} Table`}
        extra={
          <div style={{ margin: 10 }}>
            <span
              type="button"
              className="btn btn-outline-success"
              onClick={showDrawer}
            >
              Add Table
            </span>
          </div>
        }
        style={{ borderColor: "#eee", borderRadius: 30 }}
      >
        <div style={{ width: "auto" }}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{ pageSize: 5 }}
            style={{ margin: 5 }}
          />
        </div>
      </Card>
    </div>
  );

  const handleChange = (e) => {
    setError("");
    setSuccess(false);
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createTable(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        loadTable();
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Created done</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      );
    }
  };

  const createTableForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">NO. Table</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Table</button>
    </form>
  );

  const AddTable = () => (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {createTableForm()}
      </div>
    </div>
  );

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <div>
      <Drawer
        title="Table"
        placement="right"
        closeable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        store={{ position: "absolute" }}
      >
        <div>
          <AddTable />
        </div>  
      </Drawer>
      <Demo />
    </div>
  );
};

export default ManageTable;
