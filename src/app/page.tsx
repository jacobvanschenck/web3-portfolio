"use client";

import CustomConnectButton from "@/components/CustomConnectButton";
import DashboardTable from "@/components/DashboardTable";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="flex min-h-screen grow flex-col items-center justify-start gap-12 p-10">
      <div className="flex w-full items-center gap-4">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Dashboard</h2>
        {isConnected && <CustomConnectButton />}
      </div>
      {!isConnected ? (
        <section className="flex grow flex-col items-center justify-center">
          <h3>Connect Your Wallet</h3>
          <CustomConnectButton />
        </section>
      ) : (
        <section className="flex w-full flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3>Portfolio Value</h3>
            <p className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">$1,528.36</p>
          </div>
          <DashboardTable chain="ETH_MAINNET" />
        </section>
      )}
    </div>
  );
}
