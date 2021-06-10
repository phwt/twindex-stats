import moment from "moment-timezone";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { loadStocksPrice, StockPrice } from "../../../modules/ethers/Stock";
import StockCard from "./StockCard";

const StockTable = () => {
  const [prices, setPrices] = useState<StockPrice[]>([]);

  const isTradingHours = useMemo(() => {
    const dateToday = moment().format("YYYY-MM-DD");
    const openTime = moment.tz(`${dateToday} 09:30`, "America/New_York");
    const closeTime = moment.tz(`${dateToday} 16:00`, "America/New_York");
    return moment().isBetween(openTime, closeTime);
  }, []);

  useEffect(() => {
    // Faster refresh rate on trading hours
    const interval = isTradingHours ? 5000 : 30000;
    (async () => {
      setPrices(await loadStocksPrice());
      setInterval(async () => {
        setPrices(await loadStocksPrice());
      }, interval);
    })();
  }, [isTradingHours]);

  return (
    <Card
      className="p-4"
      style={{
        background: "#192230",
      }}
    >
      <Card.Body className="pt-0">
        <h4 className="mb-4 m-0">Stock Price</h4>

        <Row className="mb-3 mx-1 d-none d-lg-flex">
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Symbol
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Twindex
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Oracle
          </Col>
          <Col className="text-center" style={{ fontWeight: 300 }} md={3}>
            Difference
          </Col>
        </Row>

        {!prices.length ? (
          <div className="text-center w-100 mt-5 mb-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            {prices.map((price) => {
              return <StockCard key={price.token} price={price} />;
            })}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default StockTable;
