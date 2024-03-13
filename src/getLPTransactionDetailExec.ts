import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import getLPTransactionDetail from './getLPTransactionDetail'
import * as fs from 'fs'
import { readJsonB, writeJson } from './readJson'

const pubkey = new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5')
export async function test1() {
  const siga = await connection.getSignaturesForAddress(pubkey, { limit: 1 })
  const sig2 = siga[0].signature
  console.log(sig2)
  console.log(`https://solscan.io/tx/${sig2}`)
  return sig2
}

// test1().then(getLPTransactionDetail).then(console.log)
const str1 = readJsonB.txid
getLPTransactionDetail(str1).then((data) => {
  if (!data.poolId) {
    console.error('No data returned from getLPTransactionDetail')
    return
  }
  writeJson(data, 'data.txt')
})
