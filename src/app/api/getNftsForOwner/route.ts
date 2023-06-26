import { Network, Alchemy, NftFilters } from "alchemy-sdk";

export type NftMetadata = {
  contract: string;
  symbol: string;
  collectionName: string;
  media: string;
  format: string;
  verified: string;
  tokenType: string;
  tokenId: string;
  title: string;
  description: string;
};

export async function POST(req: Request) {
  // parse the address and chain from the request body
  const {
    address,
    pageSize,
    chain,
    excludeFilter,
    pageKey,
  }: { address: string; chain: string; pageSize: number; excludeFilter: NftFilters; pageKey: string } =
    await req.json();

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
    // Fetching the NFTs for an owner with the Alchemy SDK
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      pageSize: pageSize ? pageSize : 100,
      excludeFilters: excludeFilter && [NftFilters.SPAM],
      pageKey: pageKey ? pageKey : "",
    });

    // Formatting the fetched NFTs to the desired format
    const formattedNfts = nfts.ownedNfts.map((nft) => {
      const { contract, title, tokenType, tokenId, description, media } = nft;

      return {
        contract: contract.address,
        symbol: contract.symbol,
        collectionName: contract.openSea?.collectionName,
        media: media[0]?.gateway ? media[0]?.gateway : "https://via.placeholder.com/500",
        format: media[0]?.format,
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title,
        description,
      };
    });

    return new Response(JSON.stringify(formattedNfts), { status: 200 });
  } catch (e) {
    console.warn(e);
    return new Response("somthing went wrong, check the log in your termianl", { status: 500 });
  }
}
