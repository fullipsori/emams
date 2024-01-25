import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "../monitoring.css"

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="m-footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © epozen.
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Developed by kim, sang-hoon
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;