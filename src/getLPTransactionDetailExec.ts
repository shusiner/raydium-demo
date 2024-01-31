import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import getLPTransactionDetail from './getLPTransactionDetail'

const pubkey = new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5')
export async function test1() {
  const siga = await connection.getSignaturesForAddress(pubkey, { limit: 1 })
  const sig2 = siga[0].signature
  console.log(sig2)
  console.log(`https://solscan.io/tx/${sig2}`)
  return sig2
}

// test1().then(getLPTransactionDetail).then(console.log)
const str1 = '4zB6Mmp9Ne6jo1F4iJ7sbqWr4CwEYANn657HVXLXQwvsvZYXBPkdAEdTSt99gyyA8CCvP3e6HcdHhmtEb9KgYCc2'
getLPTransactionDetail(str1).then(console.log)
