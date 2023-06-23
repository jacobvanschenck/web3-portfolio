"use client";

import DashboardTable from "@/components/DashboardTable";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 grow">
      <div className="w-full flex gap-4">
        <h2 className="text-xl">Dashboard</h2>
        {isConnected && <ConnectButton />}
      </div>
      {!isConnected ? (
        <section className="flex flex-col items-center grow justify-center">
          <h3>Connect Your Wallet</h3>
          <ConnectButton />
        </section>
      ) : (
        <DashboardTable />
      )}
    </div>
  );
}
