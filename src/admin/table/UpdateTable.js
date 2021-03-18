import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd'

import {isAuthenticated} from '../../auth';
import {getTable, updateTable} from '../apiAdmin';

const UpdateTable = ({match}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const init = (tableId) => {
        getTable(tableId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setName(data.name);
            }
        });
    };

    useEffect(() => {
        init(match.params.tableId);
        console.log(match.params.tableId);
    }, []);

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        updateTable(match.params.tableId, user._id, token, {name}).then(
            (data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                  setName(data.name);
                }
            },
        );
    };

    const newPostForm = () => (
        <form onSubmit={clickSubmit}>
            <h4>Edit Form</h4>

            <div className="form-group">
                <label className="text-muted">Number</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    style={{width: 400}}
                />
            </div>

            <button
                className="btn btn-outline-primary"
                style={{marginRight: 10}}
            >
                Update Table
            </button>

            <Link to={'/Manage/table'}>
                <span
                    type="button"
                    className="btn btn-outline-warning"
                    style={{marginRight: 10}}
                >
                    Back
                </span>
            </Link>
        </form>
    );

    return (
        <div className="row">
            <div
                className="col"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
              <Card style={{borderRadius: 20}}>
                {newPostForm()}
              </Card>
            </div>
        </div>
    );
};

export default UpdateTable;
