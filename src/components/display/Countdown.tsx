import { useEffect, useState, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  getLockedTWINAmount,
  getUnlockDate,
} from "../../modules/ethers/LockedTwin";
import ReactCountdown, { CountdownTimeDelta } from "react-countdown";
import IconTooltip from "../common/IconTooltip";
import { useWallet } from "../../modules/contexts/WalletContext";
import moment from "moment";
import TextTransition from "react-text-transition";

const UnitRender = ({
  value,
  unit,
}: {
  value: number | string;
  unit: string;
}) => {
  return (
    <>
      <TextTransition text={value} inline noOverflow />
      &nbsp;
      <small
        style={{
          fontWeight: 200,
        }}
      >
        {unit}
      </small>
    </>
  );
};

const CountdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownTimeDelta) => {
  if (completed) return <span>Unlocked</span>;
  return (
    <span>
      <UnitRender value={days} unit="DAYS" />
      &nbsp; &nbsp;
      <UnitRender value={hours} unit="HR" />
      &nbsp; &nbsp;
      <UnitRender value={minutes} unit="MIN" />
      &nbsp; &nbsp;
      <UnitRender value={seconds} unit="SEC" />
    </span>
  );
};

const CountdownPlaceholder = () => {
  return (
    <span>
      <UnitRender value="-" unit="DAYS" />
      &nbsp; &nbsp;
      <UnitRender value="-" unit="HR" />
      &nbsp; &nbsp;
      <UnitRender value="-" unit="MIN" />
      &nbsp; &nbsp;
      <UnitRender value="-" unit="SEC" />
    </span>
  );
};

const Countdown = () => {
  const [locked, setLocked] = useState<{
    amount: string;
    valueInUsd: string;
  }>({
    amount: "----",
    valueInUsd: "$---",
  });
  const [unlockDate, setUnlockDate] = useState(0);
  const { address } = useWallet();

  useEffect(() => {
    (async () => {
      if (address) setLocked(await getLockedTWINAmount(address));
      setUnlockDate(await getUnlockDate());
    })();
  }, [address]);

  const unlockDateString = useMemo(() => {
    const format = "ddd D MMM YY HH:mm:ss (G[M]TZ)";
    if (unlockDate === 0) return moment(1625090082000).format(format);
    else return moment(unlockDate).format(format);
  }, [unlockDate]);

  return (
    <Card className="h-100">
      <Card.Body>
        <Row className="h-100 d-flex align-items-center">
          <Col md={12} lg={4} className="text-center">
            <h4 className="m-0">
              <TextTransition inline text={locked.amount} />
            </h4>
            <small className="text-muted">
              (<TextTransition inline text={locked.valueInUsd} />)
            </small>
            <br />
            <small>TWIN Locked</small>
          </Col>
          <Col md={12} lg={8} className="text-center">
            <hr className="d-lg-none d-md-block" />
            <small className="d-block text-muted mb-1">
              Approximately {unlockDateString}
            </small>
            <h4 className="m-0">
              {unlockDate !== 0 ? (
                <ReactCountdown
                  date={unlockDate}
                  renderer={CountdownRenderer}
                />
              ) : (
                <CountdownPlaceholder />
              )}
            </h4>
            <small className="text-muted">
              until rewards unlock{" "}
              <IconTooltip
                icon="info-circle"
                placement="bottom"
                text="The locked rewards will unlock approximately 30 days, and then be released linearly across one month within blocks 8763010->9627010"
              />
            </small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Countdown;
