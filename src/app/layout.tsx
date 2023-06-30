import Link from "next/link";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
  title: "Web3 Portfolio",
  description: "A portfolio for your web3 assets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex bg-zinc-50 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
            <header>
              <nav className="flex h-full flex-col justify-between border-[1px] border-l-zinc-700 bg-zinc-50 dark:border-none dark:bg-zinc-900">
                <div className="flex items-center gap-2 whitespace-nowrap px-4 py-6 text-zinc-950 dark:text-zinc-50 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                    />
                  </svg>
                  <h1 className="text-xl">Web3 Portfolio</h1>
                </div>
                <ul className="flex grow flex-col gap-4 py-16">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      passHref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                        />
                      </svg>

                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/swap"
                      className="flex items-center gap-2 px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-zinc-200 dark:hover:bg-zinc-800 "
                      passHref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <p>Swap</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buy"
                      className="flex items-center gap-2 px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-zinc-200 dark:hover:bg-zinc-800 "
                      passHref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Buy
                    </Link>
                  </li>
                </ul>
                <DarkModeToggle />
              </nav>
            </header>
            <main className="h-screen w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
