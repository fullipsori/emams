import React from "react";
import { Card, CardBody, Row, Col } from 'reactstrap';

const DockerInfo = () => {
    return(
        <React.Fragment>
            <Row>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-medium text-muted mb-1">CPU 크기</p>
                                <h4 className="mt-0 ff-secondary fw-semibold">
                                    <span className="">4 </span>
                                   COREs 
                                </h4>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-medium text-muted mb-1">MEMORY</p>
                                <h4 className="mt-0 ff-secondary fw-semibold">
                                    <span className="">256 </span>
                                   GB 
                                </h4>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    );
}

export default DockerInfo;