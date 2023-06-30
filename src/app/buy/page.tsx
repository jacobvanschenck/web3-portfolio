"use client";

import CustomConnectButton from "@/components/CustomConnectButton";
import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";

const options = [
  { value: "ETH", label: "Ethereum" },
  { value: "USDC", label: "USD Coin" },
  { value: "WBTC", label: "Wrapped Bitcoin" },
  { value: "DAI", label: "Dai" },
];

const methods = [
  {
    value: "paypal",
    label: "Paypal",
    classNames:
      "w-full rounded-3xl bg-[#FFC439] px-4 py-2 font-bold text-indigo-800 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700",
    buttonLabel: "Buy with Paypal",
  },
  {
    value: "cashapp",
    label: "Cash App",
    classNames:
      "w-full rounded-3xl bg-[#00D632] px-4 py-2 font-bold text-white disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700",
    buttonLabel: "Buy with CashApp",
  },
  {
    value: "debit",
    label: "Debit or Credit",
    classNames:
      "w-full rounded-3xl bg-indigo-500 px-4 py-2 font-bold text-zinc-50 disabled:bg-zinc-300 disabled:text-zinc-500 dark:text-zinc-50 dark:disabled:bg-zinc-700",
    buttonLabel: "Get Quote",
  },
];

export default function Buy() {
  const [tokenSelection, setTokenSelection] = useState(options[0]);
  const [paymentMethodSelection, setPaymentMethodSelection] = useState(methods[0]);
  const [amount, setAmount] = useState<string | undefined>();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  return (
    <div className="flex min-h-screen grow flex-col items-center justify-start gap-12 p-10">
      <div className="flex w-full items-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Buy</h1>
        <CustomConnectButton />
      </div>
      {!isConnected ? (
        <section className="flex grow flex-col items-center justify-center">
          <h3>Connect Your Wallet</h3>
          <CustomConnectButton />
        </section>
      ) : (
        <section className="flex h-[500px] w-[450px] flex-col gap-12">
          <div className="flex h-full w-full flex-col justify-between rounded-xl border-[1px] border-zinc-300 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900 ">
            <div className="flex w-full flex-col items-stretch gap-6">
              <h2 className="text-center text-3xl font-bold text-zinc-950 dark:text-zinc-50">Buy Crypto Token</h2>
              <div className="flex justify-between rounded-md border-[1px] border-zinc-300 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{tokenSelection.label}</p>
                  <p className="text-sm">{chain?.name}</p>
                </div>
                <select
                  className="cursor-pointer rounded-3xl border-[1px] border-zinc-300 px-4 py-2 font-bold text-zinc-950 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                  onChange={(e) => setTokenSelection(options.find((o) => o.value === e.target.value) ?? options[0])}
                >
                  {options.map((o, i) => (
                    <option key={i} value={o.value}>
                      {o.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between rounded-md border-[1px] border-zinc-300 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-950 ">
                <input
                  placeholder="$0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-2/3 bg-zinc-100 text-3xl font-bold text-zinc-950 placeholder:text-zinc-400 focus:outline-none dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-700"
                />
                <select className="cursor-pointer rounded-3xl border-[1px] border-zinc-300 px-4 py-2 font-bold text-zinc-950 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-blue-500 dark:hover:bg-blue-700 ">
                  <option value="usd">USD</option>
                  <option value="euro">EUR</option>
                </select>
              </div>
              <select
                className="cursor-pointer rounded-lg border-[1px] border-zinc-300 p-2 text-zinc-950 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                onChange={(e) =>
                  setPaymentMethodSelection(methods.find((m) => m.value === e.target.value) ?? methods[0])
                }
              >
                {methods.map((m, i) => (
                  <option key={i} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <button className={paymentMethodSelection.classNames + ""} disabled={!amount}>
              {paymentMethodSelection.buttonLabel}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
