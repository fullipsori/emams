import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Footer from './layouts/Footer'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
// import { fullscreen, exitFullScreen} from './common/FullScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function MonitoringLayout(props: {
    children: React.ReactNode
    system: React.ReactNode
    mlsn: React.ReactNode
}) {
    return (
        <React.Fragment>
            <div id="layout-wrapper">
            {/* <button onClick={()=> fullscreen(document.getElementById("layout-wrapper"))}>Make FullScreen</button>
            <button onClick={() => exitFullScreen()}>Exit FullScreen</button> */}
                {props.children}
                <Container fluid>
                    <Row>
                        <Col lg={8}>
                            {props.system}
                        </Col>
                        <Col lg={4}>
                            {props.mlsn}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </React.Fragment>
    )
}