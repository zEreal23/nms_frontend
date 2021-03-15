import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Card} from 'antd';
import {getIcomeByDay, getIcomeByMonth} from '../apiAdmin';
import moment from 'moment';

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

const SaleReport = () => {
    const [status, setStatus] = useState('init');
    const [tabs, setTabs] = useState('1');

    // days
    const [dateDay, setDateDay] = useState([]);
    const [valueDay, setValueDay] = useState([]);

    // month
    const [dateMonths, setDateMonths] = useState([]);
    const [valueMonths, setValueMonths] = useState([]);

    const initialValues = async () => {
        try {
            const days = await getIcomeByDay();
            const months = await getIcomeByMonth();
            const dateDay = days.map((v) => moment(v.time).format('dddd'));
            const valueDay = days.map((v) => v.amount);

            const dateMonths = months.map((v) => moment(v.time).format('MMMM'));
            const valueMonths = months.map((v) => v.amount);

            setDateDay(dateDay);
            setValueDay(valueDay);

            setDateMonths(dateMonths);
            setValueMonths(valueMonths);

            setStatus('done');
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeTaps = (activeKey) => {
        setTabs(activeKey);
    };

    useEffect(() => {
        initialValues();
    }, []);

    if (status === 'init') {
        return null;
    }

    return (
        <div className="container-fluid">
            <Card style={{borderRadius: 20}} hoverable>
                <Tabs onChange={onChangeTaps} activeKey={tabs}>
                    <TabPane tab="Days" key="1">
                        <div className="container">
                            <Line
                                data={{
                                    labels: dateDay,
                                    datasets: [
                                        {
                                            label: 'Day',
                                            data: valueDay,
                                            backgroundColor: [
                                                'rgba(255, 206, 86, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 206, 86, 1)',
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                height={100}
                                width={200}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Months" key="2">
                        <div className="container">
                            <Line
                                data={{
                                    labels: dateMonths,
                                    datasets: [
                                        {
                                            label: 'Month',
                                            data: valueMonths,
                                            backgroundColor: [
                                                'rgba(30,144,255, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(30,144,255, 1)',
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                height={100}
                                width={200}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default SaleReport;
