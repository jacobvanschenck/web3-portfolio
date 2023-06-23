import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

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
                    className="flex items-center px-3 py-1 gap-1 border-zinc-600 rounded-3xl border-[1px] text-zinc-100"
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
                    className="flex items-center px-3 py-1 gap-1 border-zinc-600 rounded-3xl border-[1px] text-zinc-100"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
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
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex items-center px-3 py-1 gap-1 border-zinc-600 rounded-3xl border-[1px] text-zinc-100"
                    type="button"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image alt="ens avatar" src={account.ensAvatar} width={24} height={24} />
                    </div>
                    {account.displayName}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3 h-3"
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
