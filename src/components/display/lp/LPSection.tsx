import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { getLPs, LPPrice } from "../../../modules/ethers/LiquidityPool";
import LPCard from "./LPCard";
import LPTotalCard from "./LPTotalCard";
import { useWallet } from "../../../modules/contexts/WalletContext";

const LPSection = () => {
  const [LPs, setLPs] = useState<LPPrice[]>([]);
  const [totalLP, setTotalLP] = useState<any>({});
  const [noStaked, setNoStaked] = useState(false);
  const { address } = useWallet();

  useEffect(() => {
    (async () => {
      if (address) {
        const lps = await getLPs(address);
        if (lps === null) {
          setNoStaked(true);
        } else {
          setLPs(lps.lps);
          setTotalLP(lps.total);
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
        <h4 className="mb-4 m-0">LP Holdings</h4>

        <Row className="mb-3 mx-1 d-none d-lg-flex">
          <Col className="text-center" style={{ fontWeight: 300 }} md={4}>
            LP Tokens Name
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Underlying Assets
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Pending TWIN
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={2}>
            Total Value
          </Col>
        </Row>

        {address !== "" ? (
          <>
            {!LPs.length && !noStaked && (
              <div className="text-center w-100 mt-5 mb-4">
                <Spinner animation="border" />
              </div>
            )}

            {noStaked ? (
              <div className="text-center text-muted w-100 pt-5 my-5">
                No Staked Liquidity Pool Found
              </div>
            ) : (
              <>
                {LPs.map((lp, index) => {
                  return <LPCard key={index} lp={lp} />;
                })}

                {!!LPs.length && <LPTotalCard lp={totalLP} />}
              </>
            )}
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

export default LPSection;
