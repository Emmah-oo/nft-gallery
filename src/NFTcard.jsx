import React, { useState } from "react";
import NFT from "./img/Default.jpg";
import copy from "./img/copy.png";
import check from "./img/check.png";
const NFTcard = ({ nft }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(nft.contract.address);
    setIsCopied(true);

    // Reset the "Copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div className="w-[100%] bg-slate-50 p-6 flex flex-col justify-center gap-y-2">
      <img
        src={nft.media[0]?.thumbnail || NFT}
        alt=""
        className="w-[100%] hover:scale-105 cursor-pointer transition-all"
      />
      <h1>{nft.title}</h1>
      <h1>ID: {String(nft.tokenId).slice(-2)}</h1>
      <div className="flex items-center w-[100%] gap-x-1">
        <h1>
          {String(nft.contract.address).slice(0, 4) +
            "..." +
            String(nft.contract.address).slice(-4)}
        </h1>
        {isCopied ? (
          <img src={check} alt="check" className="w-[4%]" />
        ) : (
          <img
            src={copy}
            alt="copy"
            className="w-[4%] cursor-pointer"
            onClick={copyTextToClipboard}
          />
        )}
      </div>
      <p>{nft.description}</p>
    </div>
  );
};

export default NFTcard;
