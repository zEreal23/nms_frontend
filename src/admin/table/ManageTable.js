import React, { useEffect, useState } from "react";
import { Drawer,Pagination , Card } from "antd";

import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getAllTable, deleteTable } from "../apiAdmin";
import "../Menu/ManageStyle.css";
import AddTable from './AddTable';

const ManageTable = () => {
  const [tables, setTable] = useState([]);

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

  const delTable = (categoryId) => {
    deleteTable(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadTable();
      }
    });
  };

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
      <div className="col ">
        <h2 style={{ marginTop: 10 }}>Total {tables.length} Table</h2>
      </div>

      <div>
        <span
          type="button"
          className="btn btn-outline-success"
          onClick={showDrawer}
        >
          Add Table
        </span>
      </div>

      <Drawer
        title="Category"
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
      <hr />
      <Card className="table text-center row-8" style={{borderRadius:20 , borderColor:'#eee' , margin:5}}>
      <table className="table text-center row-8">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        {tables.map((data, index) => (
          <tbody>
            <tr key={index}>
              <td>{data.noTable}</td>
              <td>
                <Link to={`/admin/table/update/${data._id}`}>
                  <span
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </span>
                </Link>

                <button
                  onClick={() => delTable(data._id)}
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
      </Card>
      <Pagination defaultCurrent={1} pageSize={5} total={tables.length} />
    </div>
  );

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <div>
      <Demo />
    </div>
  );
};

export default ManageTable;
