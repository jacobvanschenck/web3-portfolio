export default function DashboardTable() {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-zinc-800">
      <div className="flex justify-between">
        <p className="text-lg">Assets</p>
        <div className="border-zinc-100 border-2 rounded-xl">
          <button className="p-2 rounded">Tokens</button>
          <button className="p-2 rounded">NFTS</button>
          <button className="p-2 rounded">Transactions</button>
        </div>
      </div>
    </div>
  );
}
