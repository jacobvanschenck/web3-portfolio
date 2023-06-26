import { Network, Alchemy, AssetTransfersCategory, SortingOrder } from "alchemy-sdk";

type RequestBody = {
  address: string;
  chain: string;
  limit: number;
};

export type TxMetadata = {
  from: string;
  to: string;
  value: string;
  asset: string;
  hash: string;
  logo: string;
  timestamp: string;
  category: string;
};
export async function POST(req: Request) {
  // parse the address and chain from the request body
  const { address, chain, limit }: RequestBody = await req.json();

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
    // Get outgoing asset transfers for the specified address
    const outgoingAssetTransfer = await alchemy.core.getAssetTransfers({
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
      ],
      fromAddress: address,
      order: SortingOrder.DESCENDING,
      maxCount: limit ? limit : 100,
      excludeZeroValue: true,
      withMetadata: true,
    });

    // Get incoming asset transfers for the specified address
    const incomingAssetTransfer = await alchemy.core.getAssetTransfers({
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
      ],
      toAddress: address,
      order: SortingOrder.DESCENDING,
      maxCount: limit ? limit : 100,
      excludeZeroValue: true,
      withMetadata: true,
    });

    // Filter out outgoing asset transfers with value equal to 0
    const filteredOutGoingAssetTransfer = outgoingAssetTransfer.transfers.filter(
      (assetTransfer) => assetTransfer.value && assetTransfer.value > 0
    );

    // Filter incoming asset transfers with value equal to 0
    const filteredIncomingAssetTransfer = incomingAssetTransfer.transfers.filter(
      (assetTransfer) => assetTransfer.value
    );

    // Add metadata to the outgoing asset transfers and structure them
    const structuredOutgoingAssetTransfer = await Promise.all(
      filteredOutGoingAssetTransfer.map(async (assetTransfer) => {
        let tokenMetadata;
        try {
          tokenMetadata = await alchemy.core.getTokenMetadata(assetTransfer.rawContract.address ?? "");
        } catch (e) {}

        return {
          from: assetTransfer.from,
          to: assetTransfer.to,
          value: assetTransfer.value,
          asset: assetTransfer.asset,
          hash: assetTransfer.hash,
          logo: tokenMetadata ? tokenMetadata.logo : null,
          timestamp: assetTransfer.metadata.blockTimestamp,
          category: assetTransfer.category,
        };
      })
    );

    // Add metadata to the incoming asset transfers and structure them
    const structuredIncomingAssetTransfer = await Promise.all(
      filteredIncomingAssetTransfer.map(async (assetTransfer) => {
        let tokenMetadata;
        try {
          tokenMetadata = await alchemy.core.getTokenMetadata(assetTransfer.rawContract.address ?? "");
        } catch (e) {}

        return {
          from: assetTransfer.from,
          to: assetTransfer.to,
          value: assetTransfer.value,
          asset: assetTransfer.asset,
          hash: assetTransfer.hash,
          logo: tokenMetadata ? tokenMetadata.logo : null,
          timestamp: assetTransfer.metadata.blockTimestamp,
          category: assetTransfer.category,
        };
      })
    );

    let mergedTransactionHistory = [];
    let indexA = 0;
    let indexB = 0;

    while (indexA < structuredIncomingAssetTransfer.length && indexB < structuredOutgoingAssetTransfer.length) {
      if (
        Date.parse(structuredIncomingAssetTransfer[indexA].timestamp) -
          Date.parse(structuredOutgoingAssetTransfer[indexB].timestamp) >
        0
      ) {
        mergedTransactionHistory.push(structuredIncomingAssetTransfer[indexA++]);
      } else {
        mergedTransactionHistory.push(structuredOutgoingAssetTransfer[indexB++]);
      }
    }

    if (indexB < structuredOutgoingAssetTransfer.length) {
      mergedTransactionHistory = mergedTransactionHistory.concat(structuredOutgoingAssetTransfer.slice(indexB));
    } else {
      mergedTransactionHistory = mergedTransactionHistory.concat(structuredIncomingAssetTransfer.slice(indexA));
    }

    return new Response(JSON.stringify(mergedTransactionHistory), { status: 200 });
  } catch (e) {
    console.warn(e);
    return new Response("somthing went wrong, check the log in your termianl", { status: 500 });
  }
}
