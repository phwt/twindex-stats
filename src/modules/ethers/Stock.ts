import { ethers } from "ethers";
import { PRICE_FEEDS, provider, TOKENS } from "./EthersProvider";
import {
  formatUsd,
  getOracleDollyPrice,
  getTokenPriceWithDollyPair,
} from "./Utils";

export const STOCK_TOKENS: {
  [key: string]: string;
} = {
  AAPL: "0xC10b2Ce6A2BCfdFDC8100Ba1602C1689997299D3",
  AMZN: "0x1085B90544ff5C421D528aAF79Cc65aFc920aC79",
  BIDU: "0x48D2854529183e1de3D36e29D437f8F6043AcE17",
  COIN: "0xB23DC438b40cDb8a625Dc4f249734811F7DA9f9E",
  GOOGL: "0x9C169647471C1C6a72773CfFc50F6Ba285684803",
  SPCE: "0x75bD0500548B49455D2Dfd86fa30Fba476Cb3895",
  SPY: "0xf2018b59f8f9be020c12cb0a2624200d9fba2af1",
  TSLA: "0x17aCe02e5C8814BF2EE9eAAFF7902D52c15Fb0f4",
};

export interface StockPrice {
  token: string;
  stockPrice: string;
  oraclePrice: string;
  diff: string;
}

export const loadStocksPrice = async (): Promise<StockPrice[]> => {
  return await Promise.all(
    Object.entries(STOCK_TOKENS)
      .sort()
      .map(async ([token, address]) => {
        const dollyPrice = await getOracleDollyPrice();
        const stockPrice = await getTokenPriceWithDollyPair(
          address,
          dollyPrice
        );
        const oracleStockPrice = await getOracleStockPrice(address, dollyPrice);
        const diff = getDiff(stockPrice, oracleStockPrice);

        return {
          token,
          stockPrice: formatUsd(stockPrice),
          oraclePrice: formatUsd(oracleStockPrice),
          diff: Number(ethers.utils.formatEther(diff)).toFixed(2) + "%",
        };
      })
  );
};

/**
 *
 * @param {string} stockAddress Address of a Dopple synthetic stock
 * @param {BigNumber} dollyPrice dolly price (18 decimal precision) (get from getOracleDollyPrice)
 */
const getOracleStockPrice = async (stockAddress: string, dollyPrice: any) => {
  const priceFeeds = new ethers.Contract(
    PRICE_FEEDS.address,
    PRICE_FEEDS.abi,
    provider
  );

  const [stockPriceInDolly, precision] = await priceFeeds.functions.queryRate(
    stockAddress,
    TOKENS.DOLLY
  );

  return stockPriceInDolly.mul(dollyPrice).div(precision);
};

const getDiff = (price: any, oraclePrice: any) => {
  const priceDiff = price.sub(oraclePrice);

  return priceDiff.mul(ethers.utils.parseEther("100")).div(oraclePrice);
};
