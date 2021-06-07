import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IWalletProps {
  /* null - address is pending / '' - no wallet connected */
  address: string | null;
  setAddress: (address: string) => void;
  connectWallet: () => void;
}

const WalletContext = createContext({} as IWalletProps);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const address = new URLSearchParams(window.location.search).get("address");
    if (address) setAddress(address);
    else setAddress("");
  }, []);

  const handleManualAddressProvide = useCallback((address: string) => {
    window.location.href = `?address=${address}`;
  }, []);

  const handleWalletConnect = useCallback(async () => {
    if (typeof (window as any).ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      window.location.href = `?address=${account}`;
    } else {
      alert("MetaMask is not installed!");
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        setAddress: handleManualAddressProvide,
        connectWallet: handleWalletConnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
