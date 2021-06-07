const Footer = () => {
  return (
    <div
      className="w-100 text-muted py-3 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#1C232E", minHeight: "10vh" }}
    >
      <span className="text-center">
        Originally Created by{" "}
        <a href="https://github.com/ice5050/twindex-stats">ice5050</a>
        <span className="mx-3">|</span>
        Modified by <a href="https://github.com/phwt/twindex-stats">phwt</a>
        <small
          className="d-block mt-2"
          style={{
            lineHeight: "1.25em",
            fontWeight: 300,
          }}
        >
          TWINDEX Stats is not affiliated, associated, authorized, endorsed by,
          or in any way officially connected with dopple.finance or twindex.com.
          <br />
          All product and company names are the registered trademarks of their
          original owners.
        </small>
      </span>
    </div>
  );
};

export default Footer;
