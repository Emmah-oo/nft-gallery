import { useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import NFTcard from "./NFTcard";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [checked, setChecked] = useState(false);

  const [NFTs, setNFTs] = useState([]);

  const fetchNFTs = () => {
    const API_KEY = process.env.API_KEY;
    const settings = {
      apiKey: API_KEY,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(settings);

    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTs/`;

    var requestOptions = {
      method: "GET",
    };

    if (walletAddress && collectionAddress) {
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      fetch(fetchURL, requestOptions)
        .then((data) => data.json())
        .then((res) => setNFTs(res.ownedNfts));
    } else if (walletAddress) {
      alchemy.nft.getNftsForOwner(`${walletAddress}`).then((data) => {
        setNFTs(data.ownedNfts);
      });
    } else if (collectionAddress) {
      alchemy.nft.getNftsForContract(`${collectionAddress}`).then((data) => {
        setNFTs(data.nfts);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] mt-[5rem]">
      <div className="flex items-center flex-col gap-5 w-[100%]">
        <input
          disabled={checked}
          type="text"
          value={walletAddress}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          placeholder="Enter wallet address..."
          className="p-2 w-[80%] md:w-[60%] lg:w-[40%] outline-none rounded-lg bg-slate-100"
        />
        <input
          type="text"
          value={collectionAddress}
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          placeholder="Enter collection address..."
          className="p-2 w-[80%] md:w-[60%] lg:w-[40%] outline-none rounded-lg bg-slate-100"
        />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="checkbox"
          value={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="checkbox">Fetch for collection</label>
      </div>
      <div className="flex items-center justify-center mt-6 w-[100%] lg:w-[50%]">
        <button
          onClick={fetchNFTs}
          className="bg-blue-300 text-white w-[30%] px-2 py-2 hover:bg-blue-600 transition-all"
        >
          Let's go
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[3rem] w-[80%] m-auto items-center justify-center">
        {NFTs.map((nft) => (
          <NFTcard nft={nft} key={nft.tokenId} />
        ))}
      </div>
    </div>
  );
};

export default App;
