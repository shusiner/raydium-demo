import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import getLPTransactionDetail from './getLPTransactionDetail'
import * as fs from 'fs'

const pubkey = new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5')
export async function test1() {
  const siga = await connection.getSignaturesForAddress(pubkey, { limit: 1 })
  const sig2 = siga[0].signature
  console.log(sig2)
  console.log(`https://solscan.io/tx/${sig2}`)
  return sig2
}

// test1().then(getLPTransactionDetail).then(console.log)
const str1 = 'CwUuA2hhxxhfKcsTFzT68kDjHQ35UonWETpo7fiRRh2UxfNV87EqEKJYcSWG7phntCFZqZDBPLMJw53dUdbRYGd'
getLPTransactionDetail(str1).then((data) => {
  console.log(data)
  if (!data.poolId) {
    console.error('No data returned from getLPTransactionDetail')
    return
  }
  const keyValueString = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  fs.writeFile('data.txt', keyValueString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing key-value pairs to file:', err)
      return
    }
    console.log('Key-value pairs have been written to file successfully.')
    return keyValueString
  })
})
