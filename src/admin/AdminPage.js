import React, {useState, useEffect} from 'react';
import {Card, Row, Col} from 'antd';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import {getIcomeByDay, getIcomeByMonth, getIcomeByYear} from './apiAdmin';
import MangeCetagories from './category/ManageCategory';
import ManageStaff from './user/ManageUser';
import ManageMenu from './Menu/ManageProduct';

import './styles.css';

const AdminPage = () => {
    const card = {
        borderRadius: 25,
        width: '100%',
    };

    const [status, setStatus] = useState('init');
    // days
    const [valueDay, setValueDay] = useState([]);
    // month
    const [valueMonths, setValueMonths] = useState([]);
    //Year
    const [valueYears, setValueYears] = useState(0);
    console.log('Year', valueYears);

    const getTotalDay = () => {
        return valueDay.reduce((currentValue, nextValue) => {
            return currentValue + nextValue;
        }, 0);
    };

    const initialValues = async () => {
        try {
            const days = await getIcomeByDay();
            const months = await getIcomeByMonth();
            const year = await getIcomeByYear();

            const valueDay = days.map((v) => v.amount);

            const valueMonths = months.map((v) => v.amount);

            const valueYear = year.amount;

            setValueDay(valueDay);

            setValueMonths(valueMonths);

            setValueYears(valueYear);

            setStatus('done');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialValues();
    }, []);

    if (status === 'init') {
        return null;
    }

    return (
        <div>
            <br />
            <div className="container-fluid">
                <div className="admin-page-container">
                    <Card
                        style={card}
                        title={<span>Summary of weekly sales</span>}
                    >
                        <NumberFormat
                            value={getTotalDay()}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'NT$ '}
                            renderText={(value) => (
                                <span>Total : {value} TWD</span>
                            )}
                        />
                    </Card>
                    <Card
                        style={card}
                        title={<span>Summary of month sales</span>}
                    >
                        <NumberFormat
                            value={valueMonths[0]}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'NT$ '}
                            renderText={(value) => (
                                <span>Total : {value} TWD</span>
                            )}
                        />
                    </Card>
                    <Card
                        style={card}
                        title={<span>Summary of year sales</span>}
                    >
                        <NumberFormat
                            value={valueYears}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'NT$ '}
                            renderText={(value) => (
                                <span>Total : {value} TWD</span>
                            )}
                        />
                    </Card>
                </div>
            </div>

            <br />
            <MangeCetagories />
            <br />
            <ManageMenu />
            <br />
            <ManageStaff />
            <br />
        </div>
    );
};

export default AdminPage;
