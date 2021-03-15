import React, {useEffect, useState} from 'react';
import {Bar, HorizontalBar} from 'react-chartjs-2';
import {Card} from 'antd';
import {getBadSeles, getBestSeles} from '../apiAdmin';

const ReportPage = () => {
    const [status, setStatus] = useState('init');
    const [dataBestSeles, setDataBestSeles] = useState([]);
    const [valueBestSeles, setValueBestSeles] = useState([]);
    
    const [dataBadSeles, setDataBadSeles] = useState([]);
    const [valueBadSeles, setValueBadSeles] = useState([]);

    let maxValueBestSeles = 0;
    let maxValueBadSeles = 0

    if (status === 'done') {
        maxValueBestSeles = Math.max(...valueBestSeles) * 1.25
        maxValueBadSeles = Math.max(...valueBadSeles) * 1.25
    }

    const initialValues = async () => {
        try {
            const best = await getBestSeles();
            const bad = await getBadSeles();

            const bestDataSeles = best.map((v) => v.name);
            const bestValueSeles = best.map((v) => v.amount);

            const badDataSeles = bad.map((v) => v.name);
            const badValueSeles = bad.map((v) => v.amount);

            setDataBestSeles(bestDataSeles);
            setValueBestSeles(bestValueSeles);

            setDataBadSeles(badDataSeles);
            setValueBadSeles(badValueSeles);

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
        <div className="container-fluid">
            <h3 style={{ textAlign: 'center'}}>Best Seles</h3>
            <hr />
            <Card style={{borderRadius: 20}} hoverable>
                <div className="container">
                    <Bar
                        data={{
                            labels: [...dataBestSeles],
                            datasets: [
                                {
                                    label: ['# of popular', 'a'],
                                    data: [...valueBestSeles],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={100}
                        width={200}
                        options={{
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0,
                                            max: maxValueBestSeles,
                                        },
                                    },
                                ],
                            },
                        }}
                    />
                </div>
            </Card>
            
            <br />
            <h3 style={{ textAlign: 'center'}}>Bad Seles</h3>
            <hr />
            <Card style={{borderRadius: 20}} hoverable>
                <div className="container">
                    <Bar
                        data={{
                            labels: [...dataBadSeles],
                            datasets: [
                                {
                                    label: ['# of popular', 'a'],
                                    data: [...valueBadSeles],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={100}
                        width={200}
                        options={{
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0,
                                            max: maxValueBadSeles,
                                        },
                                    },
                                ],
                            },
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ReportPage;
