import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import MintCard from "./MintCard";
import { getMintPositions, MintPosition } from "../../../modules/ethers/Loan";
import IconTooltip from "../../common/IconTooltip";
import { useWallet } from "../../../modules/contexts/WalletContext";

const MintSection = () => {
  const [positions, setPositions] = useState<MintPosition[]>([]);
  const [noMinted, setNoMinted] = useState(false);
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

  return (
    <Card
      className="p-4"
      style={{
        background: "#192230",
      }}
    >
      <Card.Body className="pt-0">
        <h4 className="mb-4 m-0">
          Mint Positions
          <small className="d-inline d-lg-none">
            &nbsp;
            <IconTooltip
              icon="info-circle"
              text="Your position could be liquidated if the health reaches 0%"
            />
          </small>
        </h4>

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

            {noMinted && (
              <div className="text-center text-muted w-100 mt-5 mb-4">
                No Minted Positions Found
              </div>
            )}

            {positions.map((position, index) => {
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
