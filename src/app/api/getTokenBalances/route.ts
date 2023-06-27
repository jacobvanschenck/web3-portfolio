import { Network, Alchemy, TokenBalanceType } from "alchemy-sdk";

type MetaDataObject = {
  name: string | null;
  symbol: string | null;
  logo: string | null;
  decimals: number | null;
  balance: string | null;
  address: string | null;
};

export async function POST(req: Request) {
  // parse the address and chain from the request body
  const { address, chain }: { address: string; chain: string } = await req.json();

  // check if the request method is POST
  if (req.method !== "POST") {
    return new Response("only POST requests allowed", { status: 405 });
  }

  // set the settings for Alchemy SDK
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network: Network[chain as keyof typeof Network],
  };

  // create an instance of the Alchemy SDK
  const alchemy = new Alchemy(settings);

  try {
    // fetch the token balances using the Alchemy SDK
    const fetchedTokens = await alchemy.core.getTokenBalances(address, {
      type: TokenBalanceType.ERC20,
    });

    // fetch the Ethereum balance for the given address
    const ethBalance = await alchemy.core.getBalance(address);
    const parsedEthBalance = parseInt(ethBalance.toString()) / Math.pow(10, 18);
    const ethPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(
      (res) => res.json()
    );
    const balanceUsd = (parsedEthBalance * ethPrice.ethereum.usd).toFixed(2);

    // create an object representing the Ethereum balance
    const ethBalanceObject = {
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
      balance: parsedEthBalance.toFixed(4),
      address: "0x",
      price: ethPrice.ethereum.usd,
      balanceUsd,
    };

    // extract the token balances and contract addresses from the fetched tokens
    const fetchedTokenBalances = fetchedTokens.tokenBalances.map((token) => token.tokenBalance);

    const fetchedTokenAddresses = fetchedTokens.tokenBalances.map((token) => token.contractAddress);

    // fetch the token metadata for each token address
    const fetchedTokenMetadata = await Promise.all(
      fetchedTokenAddresses.map(async (address) => {
        let metadata;
        let tokenPrice;
        try {
          metadata = await alchemy.core.getTokenMetadata(address);
          tokenPrice = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${metadata.name}&vs_currencies=usd`
          ).then((res) => res.json());
        } catch (e) {
          console.warn(e);
          metadata = {
            name: null,
            symbol: null,
            logo: null,
            decimals: null,
          };
        }

        return { ...metadata, price: tokenPrice ?? null };
      })
    );

    // create an array of objects representing each token balance
    const unifiedBalancedAndMetadata: Array<MetaDataObject> = [ethBalanceObject];

    for (let x = 0; x < fetchedTokenMetadata.length - 1; x++) {
      const tokenMetadata = fetchedTokenMetadata[x];
      const { name, symbol, logo, decimals } = tokenMetadata;
      const hexBalance = fetchedTokenBalances[x];
      const address = fetchedTokenAddresses[x];
      let convertedBalance;
      let balanceUsd;

      if (hexBalance && tokenMetadata.decimals) {
        convertedBalance = parseInt(hexBalance) / Math.pow(10, decimals ?? 0);
        if (convertedBalance > 0) {
          balanceUsd = (convertedBalance * tokenMetadata.price).toFixed(2);
          const tokenBalanceAndMetadata = {
            name,
            symbol: symbol?.length ?? 0 > 6 ? `${symbol?.substring(0, 6)}...` : symbol,
            logo,
            decimals,
            balance: convertedBalance.toFixed(4),
            address,
            balanceUsd,
          };
          unifiedBalancedAndMetadata.push(tokenBalanceAndMetadata);
        }
      }
    }

    // filter out any token balances with empty names
    unifiedBalancedAndMetadata.filter((balanceAndMetadata) => balanceAndMetadata.name?.length);

    return new Response(JSON.stringify(unifiedBalancedAndMetadata), { status: 200 });
  } catch (e) {
    console.warn(e);
    return new Response("somthing went wrong, check the log in your termianl", { status: 500 });
  }
}
