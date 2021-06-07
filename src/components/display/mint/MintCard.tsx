import { useEffect, useState } from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import { MintPosition } from "../../../modules/ethers/Loan";

interface Props {
  position: MintPosition;
}

const MintCard = ({ position }: Props) => {
  const [maintenanceMargin, setMaintenanceMargin] = useState(0);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setMaintenanceMargin(parseFloat(position.maintenanceMargin));
      setMargin(parseFloat(position.margin));
    }, 50);
  }, [position.margin, position.maintenanceMargin]);

  return (
    <Card
      style={{
        border: "1px solid #374151",
        borderRadius: 20,
      }}
      className="mb-2 fade-list"
    >
      <Card.Body className="py-2">
        <Row>
          <Col className="text-center" style={{ fontWeight: 300 }} md={5}>
            <div>
              <span className="d-md-block d-lg-none">Asset: </span>
              {position.loanTokenAmount}{" "}
              <small style={{ fontWeight: 200 }}>
                {position.loanTokenSymbol}
              </small>
            </div>
            <div>
              <span className="d-md-block d-lg-none">Collateral: </span>
              {position.collateralTokenAmount}{" "}
              <small style={{ fontWeight: 200 }}>
                {position.collateralTokenSymbol}
              </small>
            </div>
          </Col>
          <Col
            className="text-center d-flex align-items-center mt-2"
            style={{ fontWeight: 300 }}
            md={7}
          >
            <div className="w-100">
              <ProgressBar
                style={{
                  borderRadius: 30,
                }}
              >
                <ProgressBar variant="danger" now={maintenanceMargin} />
                <ProgressBar now={margin} label={`${position.margin}%`} />
              </ProgressBar>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MintCard;
