import { Helmet } from "react-helmet";

interface Props {
  twinPrice: string;
  dopPrice: string;
}

const PriceTitle = ({ twinPrice, dopPrice }: Props) => {
  return (
    <Helmet defer={false}>
      <title>
        TWIN {twinPrice} | DOP {dopPrice} - TWINDEX Stats
      </title>
    </Helmet>
  );
};

export default PriceTitle;
