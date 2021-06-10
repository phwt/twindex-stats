import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import TextTransition from "react-text-transition";
import IconTooltip from "../common/IconTooltip";

/**
 * useEffect with previous value
 * https://stackoverflow.com/a/57706747/7405706
 *  */
const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

interface Props {
  symbol: string;
  address: string;
  price: string;
}

const PriceCard = ({ symbol, address, price }: Props) => {
  const [priceClass, setPriceClass] = useState("");
  const previousPriceString = usePrevious(price);
  const symbolIcon = useMemo(() => {
    switch (symbol) {
      case "TWIN":
        return "/twindex-stats/image/twin.svg";
      case "DOP":
        return "/twindex-stats/image/dop.svg";
    }
  }, [symbol]);

  useEffect(() => {
    if (previousPriceString !== undefined && price !== "") {
      const currentPrice = parseFloat(price.slice(1, price.length));
      const previousPrice = parseFloat(
        previousPriceString.slice(1, previousPriceString.length)
      );
      if (currentPrice < previousPrice) {
        setPriceClass("m-0 transition-5 text-danger");
        setTimeout(() => {
          setPriceClass("m-0 transition-5");
        }, 500);
      } else if (currentPrice > previousPrice) {
        setPriceClass("m-0 transition-5 text-success");
        setTimeout(() => {
          setPriceClass("m-0 transition-5");
        }, 500);
      }
    }
  }, [price]);

  const priceDisplay = useMemo(() => {
    const priceText = price === "" ? "$---" : price;
    return <TextTransition inline text={priceText} />;
  }, [price]);

  const addToken = useCallback(
    async (e) => {
      e.preventDefault();

      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address,
            symbol,
            decimals: 18,
            image: "https://phwt.github.io" + symbolIcon, // TODO: Get deployment path from package.js
          },
        },
      });

      if (!wasAdded) alert("Add Token Error!");
    },
    [address, symbolIcon, symbol]
  );

  const bscScanHref = useMemo(() => {
    return `https://bscscan.com/token/${address}`;
  }, [address]);

  const symbolDisplay = (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`tooltip-${symbol}`}>View {symbol} on BscScan </Tooltip>
        }
      >
        <a href={bscScanHref} target="_blank" rel="noreferrer">
          <>{symbol}</>
        </a>
      </OverlayTrigger>
      <a href="#" className="ml-2" onClick={addToken}>
        <IconTooltip icon="plus-circle" text={`Add ${symbol} to MetaMask`} />
      </a>
    </>
  );

  return (
    <Card className="h-100">
      <Card.Body className="d-flex align-items-center justify-content-center">
        <Row>
          <Col
            md="12"
            lg="5"
            className="text-center d-flex align-items-center justify-content-center"
          >
            <img
              src={symbolIcon}
              alt="Token Icon"
              className="img-fluid"
              style={{
                height: "3em",
              }}
            />
          </Col>
          <Col md="12" lg="7">
            <div className="d-none d-lg-flex align-items-center">
              <div>
                <h6
                  className="m-0"
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {symbolDisplay}
                </h6>
                <h2 className={priceClass}>{priceDisplay}</h2>
              </div>
            </div>

            <div className="d-lg-none d-md-flex align-items-center justify-content-center text-center">
              <div>
                <h6
                  className="m-0 mt-3"
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {symbolDisplay}
                </h6>
                <h2 className={priceClass}>{priceDisplay}</h2>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PriceCard;
