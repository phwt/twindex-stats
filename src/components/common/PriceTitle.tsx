import { Helmet } from "react-helmet";

interface Props {
  twinPrice: string;
  dopPrice: string;
}

const PriceTitle = ({ twinPrice, dopPrice }: Props) => {
  return (
    <Helmet>
      <title>
        TWIN {twinPrice} | DOP {dopPrice} - TWINDEX Stats
      </title>
    </Helmet>
  );
};

export default PriceTitle;
