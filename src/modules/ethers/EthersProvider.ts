import { ethers } from "ethers";
import { DFI_PROTOCOLS_ABI, IPANCAKE_ROUTER02_ABI } from "./ABI";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.binance.org",
  {
    name: "Binance Smart Chain",
    chainId: 56,
  }
);

export const ROUTERS = {
  twindex: {
    address: "0x6B011d0d53b0Da6ace2a3F436Fd197A4E35f47EF",
    abi: IPANCAKE_ROUTER02_ABI,
  },
};

export const TOKENS: {
  [key: string]: string;
} = {
  DOLLY: "0xfF54da7CAF3BC3D34664891fC8f3c9B6DeA6c7A5",
  DOP: "0x844FA82f1E54824655470970F7004Dd90546bB28",
  TWIN: "0x3806aae953a3a873D02595f76C7698a57d4C7A57",
};

export const PRICE_FEEDS = {
  address: "0xd4f061a6a276f8B0Ae83D210D838B45fCC7532B2",
  abi: [
    "function queryRate(address, address) external view returns (uint256 rate, uint256 precision)",
  ],
};

export const DFI_PROTOCOLS = {
  address: "0x37f5a7D8bBB1cc0307985D00DE520fE30630790c",
  abi: DFI_PROTOCOLS_ABI,
};
