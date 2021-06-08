import { Card, Row, Col } from "react-bootstrap";
import React from "react";

interface Props {
  lp: {
    unclaimedTwin: string;
    unclaimedTwinValue: string;
    lpValue: string;
  };
}

const LPTotalCard = ({ lp }: Props) => {
  return (
    <Card
      style={{
        backgroundColor: "transparent",
        border: "0",
        boxShadow: "none",
      }}
      className="fade-list"
    >
      <Card.Body>
        <Row>
          <Col md={4}></Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <h5>Total</h5>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center text-center"
          >
            <div>
              <div>
                {lp.unclaimedTwin}{" "}
                <small style={{ fontWeight: 200 }}>TWIN</small>
                <small className="text-muted d-block">
                  ({lp.unclaimedTwinValue})
                </small>
              </div>
            </div>
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center text-primary"
          >
            {lp.lpValue}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LPTotalCard;
