import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Avatar from "./avatar";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-1 rounded-3xl border-[1px] border-zinc-400 px-3 py-1 text-zinc-900 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-4">
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-1 rounded-3xl border-[1px] border-zinc-400 px-3 py-1 text-zinc-900 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="h-6 w-6 overflow-hidden rounded-full">
                        {chain.iconUrl && (
                          <Image alt={chain.name ?? "Chain icon"} src={chain.iconUrl} width={24} height={24} />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-1 rounded-3xl border-[1px] border-zinc-400 px-3 py-1 text-zinc-900 transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-blue-700 "
                    type="button"
                  >
                    {account.ensAvatar ? (
                      <div className="h-6 w-6 overflow-hidden rounded-full">
                        <Image alt="ens avatar" src={account.ensAvatar} width={24} height={24} />
                      </div>
                    ) : (
                      <Avatar id={account.address.toLowerCase()} small />
                    )}
                    {account.displayName}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
