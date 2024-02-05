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
            <div className="content__boxed ">
                <Row>
                    <Col lg={8}>
                        {props.system}
                    </Col>
                    <Col lg={4}>
                        {props.mlsn}
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        {props.children}
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}