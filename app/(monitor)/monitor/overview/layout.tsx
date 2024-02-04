import type { Metadata } from 'next'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

export default function MonitoringLayout(props: {
    children: React.ReactNode
    system: React.ReactNode
    mlsn: React.ReactNode
}) {
    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Row>
                    <Col lg={12}>
                        {props.children}
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className='p-0'>
                        {props.system}
                    </Col>
                    <Col lg={4} className='p-0'>
                        {props.mlsn}
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}