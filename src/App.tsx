import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Countdown from "./components/display/Countdown";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LPTable from "./components/display/lp/LPSection";
import MintSection from "./components/display/mint/MintSection";
import PriceCard from "./components/display/PriceCard";
import StockTable from "./components/display/stock/StockSection";
import { getDopplePrice, getTwinPrice } from "./modules/ethers/GovernanceToken";
import PriceTitle from "./components/common/PriceTitle";
import firebase from "firebase/app";
import "firebase/analytics";
import firebaseConfig from "./firebaseConfig.json";

const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

const App = () => {
  const [twinPrice, setTwinPrice] = useState("");
  const [dopplePrice, setDopplePrice] = useState("");

  useEffect(() => {
    initializeFirebase();
    (async () => {
      setTwinPrice(await getTwinPrice());
      setDopplePrice(await getDopplePrice());
      setInterval(async () => {
        setTwinPrice(await getTwinPrice());
        setDopplePrice(await getDopplePrice());
      }, 5000);
    })();
  }, []);

  return (
    <>
      <Header />
      <PriceTitle twinPrice={twinPrice} dopPrice={dopplePrice} />
      <Container
        className="pb-4"
        style={{ minHeight: "calc(100vh - 10vh - 6vh)" }}
      >
        <Row>
          {/* TODO: Stop hardcoding token data */}
          <Col md="6" lg="3">
            <PriceCard
              symbol="TWIN"
              price={twinPrice}
              address="0x3806aae953a3a873D02595f76C7698a57d4C7A57"
            />
          </Col>
          <Col md="6" lg="3" className="mt-4 mt-md-0">
            <PriceCard
              symbol="DOP"
              price={dopplePrice}
              address="0x844fa82f1e54824655470970f7004dd90546bb28"
            />
          </Col>
          <Col md="12" lg="6" className="mt-4 mt-lg-0">
            <Countdown />
          </Col>
          <Col lg="12" className="mt-4">
            <LPTable />
          </Col>
          <Col md="12" lg="6" className="mt-4">
            <MintSection />
          </Col>
          <Col md="12" lg="6" className="mt-4">
            <StockTable />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default App;
