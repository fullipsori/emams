"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Col, Label, Row } from 'reactstrap';

import btc from "../../assets/images/svg/crypto-icons/btc.svg";
import eth from "../../assets/images/svg/crypto-icons/eth.svg";
import ltc from "../../assets/images/svg/crypto-icons/ltc.svg";
import { useAppDispatch } from '@/redux/hooks';
import { reset as resetMonitor, updateChartTime, updateRefreshMode, updateTimeRange } from '@/redux/slices/monitoring/reducer';
import Select from 'react-select';

interface BreadCrumbProps {
    title: string;
    pageTitle: string;
}

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    //useIsomorphicLayoutEffect
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }
        const id = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(id)
    }, [delay])
}

/** 구조를 바꿔야 한다. */
const MonitorHeader = ({ title, pageTitle }: BreadCrumbProps) => {
    const dispatch: any = useAppDispatch();
    const [chartData, setChartData] = useState<number>();

    /* 헤더에서 chart update 용 timer 를 구동한다. */
    useEffect(() => {
        if (chartData) {
            dispatch(updateChartTime(chartData));
        }
        return () => dispatch(resetMonitor());
    }, [chartData])
    const timerFunction = () => {
        setChartData((new Date()).getTime());
    };
    useInterval(() => { timerFunction() }, 1000);

    /* mlsn select : server api*/
    const mlsnOptions = [
        { value: 'MES01-edpVPN01', label: 'MES01 > edpVPN01' },
        { value: 'MES01-edpVPN02', label: 'MES01 > edpVPN02' },
        { value: 'MES02-edpVPN01', label: 'MES02 > edpVPN01' },
    ];
    const [selectedMlsn, setSelectedMlsn] = useState<any>(null);
    function handleSelectMlsn(selectedValue: any) {
        console.log("value:" + selectedMlsn);
        setSelectedMlsn(selectedValue);
    }

    /* display queue types*/
    const queuesOptions = [
        { value: 'order', label: 'Top5. Name Order' },
        { value: 'pending', label: 'Top5. Pending Queues' },
        { value: 'hrate', label: 'Top5. 60s High Message In Rate' },
        { value: 'lrate', label: 'Top5. 60s Low Message In Rate' },
    ];
    const [selectedQueueType, setSelectedQueueType] = useState<any>(null);
    function handleSelectQueueType(selectedValue: any) {
        setSelectedQueueType(selectedValue);
    }

    /* x-axis time range */
    const timeRangeOptions = [
        { value: 5 * 60, label: 'last 5 mins' },
        { value: 15 * 60, label: 'last 15 mins' },
        { value: 30 * 60, label: 'last 30 mins' },
        { value: 1 * 3600, label: 'last 1 hour' },
        { value: 3 * 3600, label: 'last 3 hours' },
        { value: 6 * 3600, label: 'last 6 hours' },
        { value: 12 * 3600, label: 'last 12 hours' },
        { value: 24 * 3600, label: 'last 24 hours' },
        { value: 2 * 86400, label: 'last 2 days' },
        { value: 7 * 86400, label: 'last 7 days' }
    ];
    const [selectedTimeRange, setSelectedTimeRange] = useState<any>(null);
    function handleSelectTimeRange(selectedValue: any) {
        setSelectedTimeRange(selectedValue);
    }

    const periodOptions = [
        { value: 0, label: 'off' },
        { value: 5, label: '5s' },
        { value: 10, label: '10s' },
        { value: 30, label: '30s' },
        { value: 1 * 60, label: '1m' },
        { value: 5 * 60, label: '5m' },
        { value: 15 * 60, label: '15m' },
        { value: 30 * 60, label: '30m' },
        { value: 3600, label: '1h' },
        { value: 2 * 3600, label: '2h' },
        { value: 86400, label: '1d' }
    ];
    const [selectedPeroid, setSelectedPeriod] = useState<any>(null);
    function handleSelectPeriod(selectedValue: any) {
        setSelectedPeriod(selectedValue);
    }

    /* update reducer */
    useEffect(() => {
        dispatch(updateTimeRange(selectedTimeRange));
    }, [selectedTimeRange]);

    useEffect(() => {
        dispatch(updateRefreshMode(selectedPeroid));
    }, [selectedPeroid]);

    return (
        <React.Fragment>
            <Row className="m-page-title-box">
                <Col lg={3} className='d-sm-flex align-items-center'>
                    <Label htmlFor="choices-mlsn" className="form-label text-muted mb-0">Message VPN</Label>
                    <Select id="choices-mlsn" className='mb-0 ml-3'
                        value={selectedMlsn}
                        onChange={(selected: any) => { handleSelectMlsn(selected); }}
                        placeholder="Select mlsn"
                        options={mlsnOptions} />
                </Col>
                <Col lg={4} className='d-sm-flex align-items-center'>
                    <Label htmlFor="choices-queues" className="form-label text-muted mb-0">Queues</Label>
                    <Select id="choices-queues" className='mb-0 ml-3'
                        value={selectedQueueType}
                        onChange={(selected: any) => { handleSelectQueueType(selected); }}
                        placeholder="Select Queue Type"
                        options={queuesOptions} />
                </Col>
                <Col lg={5} className='ml-auto d-sm-flex align-items-center'>
                    <div className="flex-shrink-0 avatar-xs ">
                        <span className="avatar-title bg-light p-1 rounded-circle">
                            <img src={btc} className="img-fluid" alt="" />
                        </span>
                    </div>
                    <Select id="choices-time-ranges" className='mb-0 ml-3'
                        value={selectedTimeRange}
                        onChange={(selected: any) => { handleSelectTimeRange(selected); }}
                        placeholder="Select Time Ranges"
                        options={timeRangeOptions} />

                    <div className="flex-shrink-0 avatar-xs ml-3">
                        <span className="avatar-title bg-light p-1 rounded-circle">
                            <img src={eth} className="img-fluid" alt="" />
                        </span>
                    </div>
                    <div className="flex-shrink-0 avatar-xs ml-3">
                        <span className="avatar-title bg-light p-1 rounded-circle">
                            <img src={ltc} className="img-fluid" alt="" />
                        </span>
                    </div>
                    <Select id="choices-period" className='mb-0 ml-3'
                        value={selectedPeroid}
                        onChange={(selected: any) => { handleSelectPeriod(selected); }}
                        placeholder="Select period"
                        options={periodOptions} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MonitorHeader;
