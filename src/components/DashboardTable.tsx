"use client";

import { NftMetadata } from "@/app/api/getNftsForOwner/route";
import { TxMetadata } from "@/app/api/getTxHistory/route";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Avatar from "./avatar";

type DashboardTableProps = {
  chain: string;
};

type TokenTableProps = {
  address: `0x${string}` | undefined;
  chain: string;
  isConnected: boolean;
};

type NftTableProps = {
  address: `0x${string}` | undefined;
  chain: string;
};

type TxTableProps = {
  address: `0x${string}` | undefined;
  chain: string;
};

export default function DashboardTable({ chain }: DashboardTableProps) {
  const [selectedTable, setSelectedTable] = useState<"token" | "nft" | "tx">("token");

  const { address, isConnected } = useAccount();

  return (
    <div className="flex w-full flex-col rounded-xl bg-zinc-900 p-8">
      <div className="flex items-center justify-between pb-8">
        <p className="text-lg font-bold text-zinc-50">Assets</p>
        <div className="flex gap-2 rounded-3xl border-[1px] border-zinc-600 p-[2px]">
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
      {selectedTable === "nft" && <NftTable address={address} chain={chain} />}
      {selectedTable === "tx" && <TxTable address={address} chain={chain} />}
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
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-b-[1px] border-zinc-600 ">
          <th className="w-3/5 p-4 text-sm font-normal">Token</th>
          <th className="p-4 text-sm font-normal">Price</th>
          <th className="p-4 text-sm font-normal">Balance</th>
        </tr>
      </thead>
      <tbody>
        {tokenBalances &&
          tokenBalances.length > 0 &&
          tokenBalances.map((t, i) => {
            return (
              <tr key={i}>
                <td className="flex items-center gap-4 p-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-300 p-1">
                    <img src={t.logo ?? ""} alt={`${t.name} logo`} width={40} height={40} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-zinc-50">{t.symbol}</p>
                    <p className="text-sm">{t.name}</p>
                  </div>
                </td>
                <td className="p-4 font-bold text-zinc-50">{`\$${t.price}`}</td>
                <td className="flex flex-col p-4">
                  <p className="font-bold text-zinc-50">{`\$${t.balanceUsd}`}</p>
                  <p className="text-sm">{`${t.balance} ${t.symbol}`}</p>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

function NftTable({ chain, address }: NftTableProps) {
  const [nftsForOwner, setNftsForOwner] = useState<Array<NftMetadata> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getNfts = useCallback(async () => {
    try {
      const fetchedNfts = await fetch("api/getNftsForOwner", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          chain: chain,
        }),
      }).then((res) => res.json());
      setNftsForOwner(fetchedNfts);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, [address, chain]);

  useEffect(() => {
    setIsLoading(true);
    getNfts();
  }, [getNfts]);

  if (isLoading || !nftsForOwner) return <p>Loading Nfts ...</p>;
  if (nftsForOwner.length === 0) return <p>No NFTs Found for this address</p>;

  console.log(nftsForOwner);

  return (
    <div className="flex flex-wrap gap-8">
      {nftsForOwner.map((data, i) => (
        <Link
          href={`https://opensea.io/assets/ethereum/${data.contract}/${data.tokenId}`}
          target="_blank"
          key={i}
          className="flex w-48 flex-col rounded-md shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
          passHref
        >
          <div className="h-48 w-48 overflow-hidden rounded-t-md">
            <img src={data.media} alt={`Image for Nft collection: ${data.collectionName}`} width={200} height={200} />
          </div>
          <div className="flex grow flex-col items-start gap-3 rounded-b-md border-[1px] border-zinc-800 p-3">
            <p className="text-xs">{data.collectionName}</p>
            <p className="text-sm font-bold text-zinc-50">{data.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function TxTable({ chain, address }: TxTableProps) {
  const [txHistory, setTxHistory] = useState<Array<TxMetadata> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTxHistory = useCallback(async () => {
    try {
      const fetchedTxs = await fetch("/api/getTxHistory", {
        method: "POST",
        body: JSON.stringify({
          address,
          chain,
        }),
      }).then((res) => res.json());
      setTxHistory(fetchedTxs);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [address, chain]);

  useEffect(() => {
    setIsLoading(true);
    getTxHistory();
  }, [getTxHistory]);

  if (isLoading || !txHistory) return <p>Loading Transactions...</p>;
  if (txHistory.length === 0) return <p>No Transactions found for this address</p>;

  console.log(txHistory);

  return (
    <table className="table-fixed text-left">
      <tbody>
        {txHistory.map((t, i) => (
          <tr key={i}>
            <td>
              <div className="flex items-center gap-4 py-4">
                <Avatar id={t.from} />
                <div className="flex flex-col">
                  <p className="font-bold text-zinc-50">From</p>
                  <p className="text-sm">
                    {t.from.slice(0, 6)}...{t.from.slice(-6)}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center gap-4 py-4">
                <Avatar id={t.to} />
                <div className="flex flex-col">
                  <p className="font-bold text-zinc-50">To</p>
                  <p className="text-sm">
                    {t.to.slice(0, 6)}...{t.to.slice(-6)}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div className="flex flex-col">
                <p className="font-bold text-zinc-50">${t.price}</p>
                <p>{Math.round(parseInt(t.value) * 100000) / 100000} ETH</p>
              </div>
            </td>
            <td>
              <Link href={`https://etherscan.io/tx/${t.hash}`} target="_blank" passHref>
                <div className="h-10 w-10 rounded-full p-2 hover:bg-zinc-800 hover:text-zinc-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
