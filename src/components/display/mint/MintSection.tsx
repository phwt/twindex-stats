import { useEffect, useState, useMemo } from "react";
import { Card, Row, Col, Spinner, Form } from "react-bootstrap";
import MintCard from "./MintCard";
import { getMintPositions, MintPosition } from "../../../modules/ethers/Loan";
import IconTooltip from "../../common/IconTooltip";
import { useWallet } from "../../../modules/contexts/WalletContext";

const MintSection = () => {
  const [positions, setPositions] = useState<MintPosition[]>([]);
  const [noMinted, setNoMinted] = useState(false);
  const [hideSmall, setHideSmall] = useState(false);
  const { address } = useWallet();

  useEffect(() => {
    (async () => {
      if (address) {
        const mintPositions = await getMintPositions(address);
        if (mintPositions === null) {
          setNoMinted(true);
        } else {
          setPositions(mintPositions);
        }
      }
    })();
  }, [address]);

  const showPositions = useMemo(() => {
    return positions.filter((item) => {
      if (hideSmall) {
        return parseFloat(item.loanTokenAmount) > 0.0001;
      } else {
        return true;
      }
    });
  }, [positions, hideSmall]);

  return (
    <Card
      className="p-4"
      style={{
        background: "#192230",
      }}
    >
      <Card.Body className="pt-0">
        <Row className="mb-4">
          <Col xs={12} lg={6}>
            <h4 className="m-0">
              Mint Positions
              <small className="d-inline d-lg-none">
                &nbsp;
                <IconTooltip
                  icon="info-circle"
                  text="Your position could be liquidated if the health reaches 0%"
                />
              </small>
            </h4>
          </Col>
          <Col className="text-left text-lg-right pt-1" xs={12} lg={6}>
            <Form.Check
              id="hideSmall"
              custom
              label="Hide Small Assets"
              checked={hideSmall}
              onChange={({ target: { checked } }) => {
                setHideSmall(checked);
              }}
            />
          </Col>
        </Row>

        <Row className="mb-3 mx-1 d-none d-lg-flex">
          <Col className="text-center" style={{ fontWeight: 300 }} md={5}>
            Asset <br />
            Collateral
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center"
            style={{ fontWeight: 300 }}
            md={7}
          >
            Health&nbsp;
            <IconTooltip
              icon="info-circle"
              text="Your position could be liquidated if the health reaches 0%"
            />
          </Col>
        </Row>

        {address !== "" ? (
          <>
            {!positions.length && !noMinted && (
              <div className="text-center w-100 mt-5 mb-4">
                <Spinner animation="border" />
              </div>
            )}

            {(noMinted || (hideSmall && showPositions.length === 0)) && (
              <div className="text-center text-muted w-100 mt-5 mb-4">
                No Minted Positions Found
              </div>
            )}

            {showPositions.map((position, index) => {
              return (
                <MintCard
                  key={`${position.collateralTokenSymbol}-${position.loanTokenSymbol}-${index}`}
                  position={position}
                />
              );
            })}
          </>
        ) : (
          <div className="text-center text-muted w-100 mt-5 mb-4">
            No Wallet Connected
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MintSection;
