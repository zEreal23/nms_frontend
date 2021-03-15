import React, {useState, useEffect} from 'react';
import {Card, Row, Col} from 'antd';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import {getIcomeByDay, getIcomeByMonth, getIcomeByYear} from './apiAdmin';
import MangeCetagories from './category/ManageCategory';
import ManageStaff from './user/ManageUser';
import ManageMenu from './Menu/ManageProduct';

const AdminPage = () => {
    const card = {
        borderRadius: 25,
        width: 'auto',
        margin: 10,
    };

    const [status, setStatus] = useState('init');
    // days
    const [valueDay, setValueDay] = useState([]);
    // month
    const [valueMonths, setValueMonths] = useState([]);
    //Year
    const [valueYears, setValueYears] = useState(0)
    console.log('Year',valueYears)

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

            const valueYear = year.amount

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
        <div className="container">
            <Row>
                <Col>
                    <Card
                        style={card}
                        hoverable
                        title={<h5>Summary of weekly sales</h5>}
                    >
                        <>
                            <NumberFormat
                                value={getTotalDay()}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'NT$ '}
                                renderText={(value) => (
                                    <h5>Total : {value} TWD</h5>
                                )}
                            />
                        </>
                    </Card>
                </Col>

                <Col>
                    <Card
                        style={card}
                        hoverable
                        title={<h5>Summary of month sales</h5>}
                    >
                        <>
                            <NumberFormat
                                value={valueMonths[0]}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'NT$ '}
                                renderText={(value) => (
                                    <h5>Total : {value} TWD</h5>
                                )}
                            />
                        </>
                    </Card>
                </Col>

                <Col>
                    <Card
                        style={card}
                        hoverable
                        title={<h5>Summary of year sales</h5>}
                    >
                         <>
                            <NumberFormat
                                value={valueYears}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'NT$ '}
                                renderText={(value) => (
                                    <h5>Total : {value} TWD</h5>
                                )}
                            />
                        </>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <MangeCetagories />
                    <ManageMenu />
                    <ManageStaff />
                </Col>
            </Row>
        </div>
    );
};

export default AdminPage;
