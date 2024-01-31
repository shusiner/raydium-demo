import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import { Token, TOKEN_PROGRAM_ID } from '@raydium-io/raydium-sdk'

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
  const mintPublicKey = new PublicKey(tokenMintAddress)

  try {
    const mintInfo = await connection.getAccountInfo(mintPublicKey)
    if (!mintInfo) {
      throw new Error('Mint not found')
    }
    console.log(mintInfo.data)
    // Check if the mint authority is null, indicating mintability
    const mintAuthority = mintInfo.data.slice(8, 40)
    const isMintable = mintAuthority.every((byte) => byte === 0)

    const freezeAuthority = mintInfo.data.slice(44, 76)
    const isFreezable = freezeAuthority.every((byte) => byte === 0)
    // Check if the mutable data is null, indicating non-mutability
    const mutableData = mintInfo.data.slice(76)
    const isMutable = mutableData.every((byte) => byte === 0)

    return {
      isMintable,
      isFreezable,
      isMutable,
    }
  } catch (error) {
    throw new Error(`Error fetching token supply: ${error}`)
  }
}
