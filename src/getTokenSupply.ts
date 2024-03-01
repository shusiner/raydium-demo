import { PublicKey } from '@solana/web3.js'
import { connection, rpcUrl } from '../config'
import {
  getAccount,
  getExtensionData,
  getImmutableOwner,
  getMint,
  ExtensionType,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { fetchDigitalAsset, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { publicKey } from '@metaplex-foundation/umi'

// Use the RPC endpoint of your choice.
const umi = createUmi(rpcUrl).use(mplTokenMetadata())

export async function getTotalTokenSupply(tokenMintAddress: string) {
  const mintPublicKey = new PublicKey(tokenMintAddress)

  try {
    const tokenSupply = await connection.getTokenSupply(mintPublicKey)
    return tokenSupply.value.uiAmount // Extract the total token supply
  } catch (error) {
    throw new Error(`Error fetching token supply: ${error}`)
  }
}

export async function getTotalInfo(tokenMintAddress: string) {
  //   const mintPublicKey = new PublicKey(tokenMintAddress)

  try {
    // const mintInfo = await connection.getAccountInfo(mintPublicKey)
    // const mint1 = await getMint(connection, mintPublicKey, 'confirmed', TOKEN_PROGRAM_ID)
    const {
      mint,
      metadata: { name, symbol, uri, isMutable, updateAuthority },
    } = await fetchDigitalAsset(umi, publicKey(tokenMintAddress))
    const supply = mint.supply
    const isFreezable = mint.freezeAuthority.__option !== 'None'
    const isMintable = mint.mintAuthority.__option !== 'None'
    // console.log(mint1)
    // console.log(mint1.tlvData)
    // if (!mintInfo) {
    //   throw new Error('Mint not found')
    // }
    // const extensionData = getExtensionData(ExtensionType.MintCloseAuthority, mint1.tlvData)
    // console.log(extensionData)
    // const acc = await getAccount(connection, mintPublicKey, 'confirmed', TOKEN_PROGRAM_ID)
    // console.log(getImmutableOwner(acc))

    // Check if the mint authority is null, indicating mintability
    // const mintAuthority = mintInfo.data.slice(8, 40)
    // const isMintable = mintAuthority.every((byte) => byte === 0)

    // const freezeAuthority = mintInfo.data.slice(44, 76)
    // const isFreezable = freezeAuthority.every((byte) => byte === 0)
    // Check if the mutable data is null, indicating non-mutability
    // const mutableData = mintInfo.data.slice(76)
    // const isMutable = mutableData.every((byte) => byte === 0)

    return { name, symbol, supply, isFreezable, isMintable, isMutable, uri, updateAuthority }
  } catch (error) {
    throw new Error(`Error fetching token supply: ${error}`)
  }
}

// getSignature('EhoF52UXqCa4AhBrFBWcktQ58wsbb1YwPxt5HxtW4hfD')
