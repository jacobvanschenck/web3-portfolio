import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Web3 Portfolio",
  description: "A portfolio for your web3 assets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/swap">Swap</Link>
            </li>
            <li>
              <Link href="/buy">Buy</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
