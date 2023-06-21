import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 grow">
      <div className="w-full flex">
        <h2 className="text-xl">Dashboard</h2>
      </div>
      <section className="flex flex-col items-center grow justify-center">
        <h3>Connect Your Wallet</h3>
        <ConnectButton />
      </section>
    </div>
  );
}
