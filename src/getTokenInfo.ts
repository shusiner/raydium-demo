import {
  fetchDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import bs58 from "bs58";
import { struct, u64, u8 } from "@raydium-io/raydium-sdk";
import { LPOBJ } from "./type";

// Use the RPC endpoint of your choice.

export async function getTokenInfo(tokenMintAddress: string, rpcUrl: string) {
  //   const mintPublicKey = new PublicKey(tokenMintAddress)
  const umi = createUmi(rpcUrl).use(mplTokenMetadata());

  try {
    const {
      mint,
      metadata: { name, symbol, uri, isMutable, updateAuthority },
    } = await fetchDigitalAsset(umi, publicKey(tokenMintAddress));
    const supply = mint.supply;
    const isFreezable = mint.freezeAuthority.__option !== "None";
    const isMintable = mint.mintAuthority.__option !== "None";

    return {
      name,
      symbol,
      supply,
      isFreezable,
      isMintable,
      isMutable,
      uri,
      updateAuthority,
    };
  } catch (error) {
    throw new Error(`Error fetching token info: ${error}`);
  }
}

const dataLayout = struct([
  u8("instruction"),
  u8("nonce"),
  u64("openTime"),
  u64("pcAmount"),
  u64("coinAmount"),
]);

// take base 54 string and layout to decode
const decode = (openInstruction: string) => {
  // Sample hex instruction data (replace with your actual hex data)
  const base58String = openInstruction;

  const decodedBuffer = bs58.decode(base58String);

  // Convert the decoded buffer to a hexadecimal string
  const hexInstructionData = Buffer.from(decodedBuffer).toString("hex");

  // Create a Buffer from the hex data
  const instructionBuffer = Buffer.from(hexInstructionData, "hex");

  // Deserialize the instruction data using the layout
  const decodedInstruction = dataLayout.decode(instructionBuffer);

  return decodedInstruction;
};

export const getLPOBJInfo = (obj1: LPOBJ[]) => {
  let quoteMint: string = "a",
    quoteAmt: string = "a",
    quoteDecimal: number = 9,
    baseMint: string = "a",
    baseAmt: string = "a",
    baseDecimal: number = 9,
    lpMint: string = "a",
    lpAmt: string = "a",
    lpDecimal: number = 9,
    lpMarketId: string = "a";
  const t1 = obj1[0];
  const timestamp = t1.timestamp;
  const signature = t1.signature;

  const openInstruction = t1.instructions.filter(
    (a) => a.programId === "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
  )[0];
  const decodeIns = decode(openInstruction.data);

  const openTimestamp: number = decodeIns.openTime.toNumber();
  // const openTimeStamp2 = openTimeStamp * 1000
  // const date = new Date(openTimeStamp2)
  // console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
  // console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

  try {
    lpMarketId = t1.accountData[2].account;
    const quote = t1.accountData[5].tokenBalanceChanges[0];
    quoteMint = quote.mint;
    quoteAmt = quote.rawTokenAmount.tokenAmount;
    quoteDecimal = quote.rawTokenAmount.decimals;
    const base = t1.accountData[6].tokenBalanceChanges[0];
    baseMint = base.mint; // 'So11111111111111111111111111111111111111112' assume sol
    baseAmt = base.rawTokenAmount.tokenAmount;
    baseDecimal = base.rawTokenAmount.decimals;
    const lpToken = t1.accountData[10].tokenBalanceChanges[0];
    lpMint = lpToken.mint;
    lpAmt = lpToken.rawTokenAmount.tokenAmount;
    lpDecimal = lpToken.rawTokenAmount.decimals;
  } catch {
    const idoAccs = openInstruction.accounts;
    lpMarketId = idoAccs[4];
    quoteMint = idoAccs[8];
    baseMint = idoAccs[9];
    lpMint = idoAccs[7];
    quoteAmt = decodeIns.coinAmount.toString();
    baseAmt = decodeIns.pcAmount.toString();
    const lpAmt1 = t1.tokenTransfers.filter((a) => a.mint === lpMint)[0].tokenAmount;
    lpDecimal = (lpAmt1.toString().split(".")[1] || "").length;
    lpAmt = lpAmt1.toString().replace(".", "");
    // console.log(t1.accountData.filter((acc) => acc.account === quoteMint));
    // quoteAmt = t1.accountData.filter((acc) => acc.account === quoteMint)[0]
    //   .tokenBalanceChanges[0].rawTokenAmount.tokenAmount;
  }

  const data = {
    lpMarketId,
    quoteMint,
    quoteAmt,
    quoteDecimal,
    baseMint,
    baseAmt,
    baseDecimal,
    lpMint,
    lpAmt,
    lpDecimal,
    timestamp,
    signature,
    openTimestamp,
  };

  return data;
};

//
// const data = await getLPOBJInfo(res, rpcString)
//     console.log(data)
//     if (!data) return
//     const quoteMintSupply = data?.quoteData.tokenAmount
//     const d2 = await getTokenInfo(data.quoteMint)
//       console.log(parseFloat(quoteMintSupply) / Number(d2.supply))
