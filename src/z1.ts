import { Keypair, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

let key1 = '2x9SfK7kYPCw4TyNWzgHT7zWfxAEj3iha4EXVL14pjUR'
export const wallet = Keypair.fromSecretKey(bs58.decode(key1))
