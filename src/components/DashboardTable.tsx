"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type DashboardTableProps = {
  chain: string;
};

type TokenTableProps = {
  address: `0x${string}` | undefined;
  chain: string;
  isConnected: boolean;
};

export default function DashboardTable({ chain }: DashboardTableProps) {
  const [selectedTable, setSelectedTable] = useState<"token" | "nft" | "tx">("token");

  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col p-8 rounded-xl bg-zinc-900 w-full">
      <div className="flex justify-between items-center pb-8">
        <p className="text-lg font-bold text-zinc-50">Assets</p>
        <div className="flex border-zinc-600 border-[1px] rounded-3xl p-[2px] gap-2">
          <button
            onClick={() => setSelectedTable("token")}
            className={`px-4 py-2 rounded-3xl ${
              selectedTable === "token" ? "bg-zinc-600 text-zinc-50" : "hover:bg-zinc-800 hover:text-zinc-50"
            }`}
          >
            Tokens
          </button>
          <button
            onClick={() => setSelectedTable("nft")}
            className={`px-4 py-2 rounded-3xl ${
              selectedTable === "nft" ? "bg-zinc-600 text-zinc-50" : "hover:bg-zinc-800 hover:text-zinc-50"
            }`}
          >
            NFTS
          </button>
          <button
            onClick={() => setSelectedTable("tx")}
            className={`px-4 py-2 rounded-3xl ${
              selectedTable === "tx" ? "bg-zinc-600 text-zinc-50" : "hover:bg-zinc-800 hover:text-zinc-50"
            }`}
          >
            Transactions
          </button>
        </div>
      </div>
      {selectedTable === "token" && <TokenTable address={address} chain={chain} isConnected={isConnected} />}
      {selectedTable === "nft" && <p>nft</p>}
      {selectedTable === "tx" && <p>tx</p>}
    </div>
  );
}

function TokenTable({ address, chain, isConnected }: TokenTableProps) {
  const [tokenBalances, setTokenBalances] = useState<Array<any> | null>(null);
  const [isLoading, setIsloading] = useState(false);

  const getBalance = useCallback(async () => {
    setIsloading(true);
    if (isConnected) {
      try {
        const fetchedTokensBalance = await fetch("/api/getTokenBalances", {
          method: "POST",
          body: JSON.stringify({
            address: address,
            chain: chain,
          }),
        }).then((res) => res.json());
        setTokenBalances(fetchedTokensBalance);
      } catch (e) {
        console.log(e);
      }
    }
    setIsloading(false);
  }, [address, chain, isConnected]);

  // Fetch token balances when myAddress changes
  useEffect(() => {
    if (address?.length) getBalance();
  }, [address, getBalance]);

  console.log(tokenBalances);

  if (isLoading) return <p>Loading Tokens ...</p>;

  return (
    <table className="text-left table-fixed">
      <thead>
        <tr className="border-zinc-600 border-b-[1px] ">
          <th className="w-3/5 p-4 font-normal text-sm">Token</th>
          <th className="p-4 font-normal text-sm">Price</th>
          <th className="p-4 font-normal text-sm">Balance</th>
        </tr>
      </thead>
      <tbody>
        {tokenBalances &&
          tokenBalances.length > 0 &&
          tokenBalances.map((t, i) => {
            return (
              <tr key={i}>
                <td className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-300 p-1">
                    <img src={t.logo ?? ""} alt={`${t.name} logo`} width={40} height={40} />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-50 text-xl">{t.symbol}</p>
                    <p className="text-sm">{t.name}</p>
                  </div>
                </td>
                <td className="p-4">price</td>
                <td className="p-4">{`${t.balance} ${t.symbol}`}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
