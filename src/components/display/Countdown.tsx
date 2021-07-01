import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  getCanUnlockTWINAmount,
  getLockedTWINAmount,
} from "../../modules/ethers/LockedTwin";
import IconTooltip from "../common/IconTooltip";
import { useWallet } from "../../modules/contexts/WalletContext";
import TextTransition from "react-text-transition";

const Countdown = () => {
  const [locked, setLocked] = useState<{
    amount: string;
    valueInUsd: string;
  }>({
    amount: "----",
    valueInUsd: "$---",
  });
  const [canUnlock, setCanUnlock] = useState<{
    amount: string;
    valueInUsd: string;
  }>({
    amount: "----",
    valueInUsd: "$---",
  });
  const { address } = useWallet();

  useEffect(() => {
    (async () => {
      if (address) {
        setLocked(await getLockedTWINAmount(address));
        setCanUnlock(await getCanUnlockTWINAmount(address));
      }
    })();
  }, [address]);

  const canUnlockBlock = (
    <>
      <h4 className="m-0">
        <TextTransition inline text={canUnlock.amount} />
      </h4>
      <small className="text-muted">
        (<TextTransition inline text={canUnlock.valueInUsd} />)
      </small>
      <br />
      <small>
        Available to Unlock{" "}
        <IconTooltip
          icon="info-circle"
          placement="bottom"
          text="The locked rewards will release linearly across one month within blocks 8763010 to 9627010"
        />
      </small>
    </>
  );

  return (
    <Card className="h-100">
      <Card.Body>
        <Row className="h-100 d-flex align-items-center">
          <Col md={12} lg={6} className="text-center">
            <h4 className="m-0">
              <TextTransition inline text={locked.amount} />
            </h4>
            <small className="text-muted">
              (<TextTransition inline text={locked.valueInUsd} />)
            </small>
            <br />
            <small>TWIN Locked</small>
          </Col>

          <Col
            md={12}
            lg={6}
            className="text-center border-top mt-3 pt-3 d-inline d-lg-none"
          >
            {canUnlockBlock}
          </Col>
          <Col
            md={12}
            lg={6}
            className="text-center border-left d-none d-lg-inline"
          >
            {canUnlockBlock}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Countdown;
