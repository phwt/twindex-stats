import { Helmet } from "react-helmet";

interface Props {
  twinPrice: string;
  dopPrice: string;
}

const PriceTitle = ({ twinPrice, dopPrice }: Props) => {
  return (
    <Helmet defer={false}>
      {twinPrice === "" || dopPrice === "" ? (
        <title>TWINDEX Stats</title>
      ) : (
        <title>
          {twinPrice} TWIN | {dopPrice} DOP - TWINDEX Stats
        </title>
      )}
    </Helmet>
  );
};

export default PriceTitle;
