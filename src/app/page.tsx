import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h2>Dashboard</h2>
      <section className="flex flex-col items-center">
        <h3>Connect Your Wallet</h3>
        <ConnectButton />
      </section>
    </main>
  );
}
