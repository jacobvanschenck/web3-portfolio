export default function DashboardTable() {
  return (
    <div className="flex flex-col p-8 rounded-xl bg-zinc-900 w-full">
      <div className="flex justify-between items-center pb-8">
        <p className="text-lg">Assets</p>
        <div className="border-zinc-600 border-[1px] rounded-3xl">
          <button className="p-2 rounded">Tokens</button>
          <button className="p-2 rounded">NFTS</button>
          <button className="p-2 rounded">Transactions</button>
        </div>
      </div>
      <table className="text-left table-fixed">
        <thead>
          <tr className="border-zinc-600 border-b-[1px]">
            <th className="w-3/5">Token</th>
            <th>Price</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>first</td>
            <td>first</td>
            <td>first</td>
          </tr>
          <tr>
            <td>second</td>
            <td>second</td>
            <td>second</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
