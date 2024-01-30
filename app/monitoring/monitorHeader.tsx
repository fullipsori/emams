import React from 'react';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';

import btc from "../assets/images/svg/crypto-icons/btc.svg";
import eth from "../assets/images/svg/crypto-icons/eth.svg";
import ltc from "../assets/images/svg/crypto-icons/ltc.svg";

interface BreadCrumbProps {
    title: string;
    pageTitle : string;
}

/** 구조를 바꿔야 한다. */
const MonitorHeader = ({ title, pageTitle } : BreadCrumbProps) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="m-page-title-box d-sm-flex align-items-center ">
                        <h6 className="mb-sm-0 fw-bold">Message VPN</h6>
                        <select className="form-select mb-1 ml-3" style={{width:"20%"}} aria-label="mlsn select ">
                            <option >Select mlsn</option>
                            <option value="1">MES01 - edpVPN01</option>
                            <option value="2">MES01 - edpVPN02</option>
                            <option value="3">MES02 - edpVPN01</option>
                        </select>
                        <h4 className="mb-sm-0 ml-3 fw-bold">Queues</h4>
                        <select className="form-select mb-1 ml-3" style={{width:"20%"}} aria-label="queue select ">
                            <option >Select Queue types</option>
                            <option value="1">Name Order</option>
                            <option value="2">Top5. Pending Queues</option>
                            <option value="3">Top5. 60s High Message In Rate</option>
                            <option value="4">Top5 60s Low Message In Rate</option>
                        </select>

                        <div className="page-title-right d-sm-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs ml-3">
                                <span className="avatar-title bg-light p-1 rounded-circle">
                                    <img src={btc} className="img-fluid" alt="" />
                                </span>
                            </div> 
                            <select className="form-select mb-1 ml-3" aria-label="X-axis range">
                                <option >Select time ranges</option>
                                <option value="1">last 5 minutes</option>
                                <option value="2">last 15 minutes</option>
                                <option value="3">last 30 minutes</option>
                                <option value="4">last 1 hour</option>
                                <option value="5">last 3 hours</option>
                                <option value="6">last 6 hours</option>
                                <option value="7">last 12 hours</option>
                                <option value="8">last 24 hours</option>
                                <option value="9">last 2 days</option>
                                <option value="10">last 7 days</option>
                            </select>
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
                            <select className="form-select mb-1 ml-3" aria-label="period select ">
                                <option >Select period</option>
                                <option value="1">off</option>
                                <option value="2">5s</option>
                                <option value="3">10s</option>
                                <option value="4">30s</option>
                                <option value="5">1m</option>
                                <option value="6">5m</option>
                                <option value="7">15m</option>
                                <option value="8">30m</option>
                                <option value="9">1h</option>
                                <option value="10">2h</option>
                                <option value="10">1d</option>
                            </select>
                        </div>
                        {/* <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link href="#">{pageTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div> */}

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MonitorHeader;