import { useState, useCallback, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useWallet } from "../../modules/contexts/WalletContext";

const AddressForm = () => {
  const { address, setAddress, connectWallet } = useWallet();
  const [localAddress, setLocalAddress] = useState("");

  useEffect(() => {
    if (address) setLocalAddress(address);
  }, [address]);

  const handleSearch = useCallback(() => {
    setAddress(localAddress);
  }, [localAddress]);

  return (
    <Form inline>
      <InputGroup>
        <Form.Control
          placeholder="Wallet Address"
          name="address"
          value={localAddress}
          onChange={(e) => {
            setLocalAddress(e.target.value);
          }}
          aria-label="Wallet Address"
          size="sm"
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            size="sm"
            type="button"
            name="search"
            onClick={handleSearch}
          >
            <i className="fa fa-search" />
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <Button
        variant="primary"
        size="sm"
        className="ml-2"
        type="button"
        onClick={connectWallet}
      >
        Connect to a wallet
      </Button>
    </Form>
  );
};

const Header = () => {
  return (
    <Container style={{ minHeight: "6vh" }}>
      <Navbar variant="dark" expand="lg">
        <Navbar.Brand href="#">
          <img
            src="twindex-stats/image/ts-white.svg"
            height="30"
            className="d-inline-block align-top mr-1 p-1"
            alt="TWINDEX Stats"
          />
          <b
            style={{
              letterSpacing: 4,
              fontWeight: 600,
            }}
          >
            TWINDEX
          </b>{" "}
          <span
            style={{
              fontWeight: 200,
            }}
          >
            Stats
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
          <AddressForm />
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
