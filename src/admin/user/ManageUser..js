import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { Drawer } from "antd";

import { getUsers , deleteUser } from "../apiAdmin";
import Staff from "../../image/user.png";
import CreateUsers from "../../user/signup";

import { isAuthenticated } from "../../auth";

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    console.log(visible);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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

  const delUser = (userDelId) => {
    console.log(userDelId)
    deleteUser(userDelId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const DisplayUsers = () => (
    <div className="container" style={{ marginTop: 20}}>
      <div className="row">
        <Link to={"/admin/home"}>
          <span
            type="button"
            className="btn btn-outline-dark"
            style={{ marginRight: 2, width: 100 }}
          >
            Back
          </span>
        </Link>

        <div className="col-9">
          <h2>Total {users.length} Users</h2>
        </div>

        <div className="col">
          <span
            type="button"
            className="btn btn-outline-success"
            onClick={showDrawer}
          >
            + Add
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
          width={"auto"}
        >
          <div>
            <CreateUsers />
          </div>
        </Drawer>
     
        <div className="row" style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
          {users.map((u, i) => (
            <div key={i}>
              <Card
                title={u.name}
                bordered={true}
                style={{
                  width: 250,
                  borderRadius: 30,
                 
                  borderWidth: 1,
                  borderColor: "black",
                  margin:10
                }}
              >
                <div className="text-center">
                  <img
                    src={Staff}
                    alt="user"
                    style={{
                      height: 80,
                      borderRadius: "50%",
                      borderWidth: "50px",
                    }}
                  />
                </div>
                <p>{u._id}</p>
                <p>{u.role}</p>
                <Link to={`/admin/user/update/${u._id}`}>
                  <span
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </span>
                </Link>

                <button
                  onClick={() => delUser(u._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <DisplayUsers />
    </div>
  );
};

export default ManageUser;
