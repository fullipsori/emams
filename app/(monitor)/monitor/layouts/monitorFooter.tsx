import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "../assets/monitoring.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const footer_start= '핵심 모니터링 지표 |'
const footer_end ="Developed by epozen"
const MonitorFooter = () => {
    return (
        <React.Fragment>
            <div className="monitor-footer">
            {/* <div className="content__wrap py-3 py-md-1 d-flex flex-column flex-md-row align-items-md-center"> */}
                <div className="text-nowrap mb-4 mb-md-0">{footer_start} </div>
                <div className="flex-column gap-1 flex-md-row gap-md-3 ms-md-auto " style={{ rowGap: "0 !important" }}>
                    {footer_end}
                </div>
            </div>
        </React.Fragment>
    );
};

export default MonitorFooter;
