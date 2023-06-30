"use client";

import CustomConnectButton from "@/components/CustomConnectButton";
import { useState } from "react";
import { useAccount } from "wagmi";

const options = [
  { value: "ETH", label: "Ethereum" },
  { value: "USDC", label: "USD Coin" },
  { value: "WBTC", label: "Wrapped Bitcoin" },
  { value: "DAI", label: "Dai Stablecoin" },
  { value: "BNB", label: "BNB" },
  { value: "AAVE", label: "Aave" },
  { value: "UNI", label: "Uniswap" },
  { value: "SUSHI", label: "SushiSwap" },
];

export default function Swap() {
  const { isConnected } = useAccount();
  const [_, setToTokenSelection] = useState(options[0]);
  const [__, setFromTokenSelection] = useState(options[0]);
  const [amount, setAmount] = useState<string | undefined>();

  return (
    <div className="flex min-h-screen grow flex-col items-center justify-start gap-12 p-10">
      <div className="flex w-full items-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Swap</h1>
        <CustomConnectButton />
      </div>
      {!isConnected ? (
        <section className="flex grow flex-col items-center justify-center">
          <h3>Connect Your Wallet</h3>
          <CustomConnectButton />
        </section>
      ) : (
        <section className="flex h-[500px] w-[400px] flex-col gap-12">
          <div className="flex h-full w-full flex-col justify-between rounded-xl border-[1px] border-zinc-300 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900 ">
            <div className="flex w-full flex-col items-stretch gap-6">
              <h2 className="text-center text-3xl font-bold text-zinc-950 dark:text-zinc-50">Swap Crypto Tokens</h2>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-zinc-950 dark:text-zinc-50">Swap from</p>
                <div className="flex w-full">
                  <select
                    className="h-full w-1/2 cursor-pointer rounded-l-lg border-[1px] border-zinc-300 p-4 font-bold text-zinc-950 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                    onChange={(e) =>
                      setFromTokenSelection(options.find((o) => o.value === e.target.value) ?? options[0])
                    }
                  >
                    {options.map((o, i) => (
                      <option key={i} value={o.value}>
                        {o.value}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-1/2 rounded-r-lg border-[1px] border-zinc-300 bg-zinc-50 p-4 text-lg font-bold text-zinc-950 placeholder:text-zinc-400 focus:outline-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-700"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-zinc-950 dark:text-zinc-50">Swap to</p>
                <select
                  className="cursor-pointer rounded-lg border-[1px] border-zinc-300 p-4 text-zinc-950 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                  onChange={(e) => setToTokenSelection(options.find((o) => o.value === e.target.value) ?? options[3])}
                >
                  {options.map((o, i) => (
                    <option key={i} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className=" w-full rounded-3xl bg-indigo-500 px-4 py-2 font-bold text-zinc-50 disabled:bg-zinc-300 disabled:text-zinc-500 dark:text-zinc-50 dark:disabled:bg-zinc-700"
              disabled={!amount}
            >
              Swap
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
