import waitForTx from './waitForTx'
import util from 'util'
import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'

function getRepeatedDigits(arr: number[]): number[] {
  const indicesMap: { [key: number]: number[] } = {}
  const repeatedDigits: number[] = []

  arr.forEach((value, index) => {
    if (value > 100000000)
      if (!indicesMap[value]) {
        indicesMap[value] = [index]
      } else {
        indicesMap[value].push(index)
        if (indicesMap[value].length === 2) {
          // if it's the second occurrence
          repeatedDigits.push(value)
        }
      }
  })

  return repeatedDigits
}
export default async function swapData(sig: string) {
  const waitTime = 10000

  const { sig3 } = await waitForTx(sig, waitTime)
  // console.log(sig3?.transaction.message.accountKeys.map((a) => a.pubkey))
  const preBalances = sig3?.meta?.preBalances
  // const preTokenBalances = sig3?.meta?.preTokenBalances
  // const postTokenBalances = sig3?.meta?.postTokenBalances
  const innerInstructions = sig3?.meta?.innerInstructions
  // const innerInstructions2 = innerInstructions
  //   ?.map((a) => a.instructions.map((b) => (b as any).parsed.info.amount))
  //   .filter((a) => a !== undefined)
  // const token = innerInstructions
  //   ?.map((a) => a.instructions.map((b) => (b as any).parsed.info.amount))[1]
  //   .map((a) => parseInt(a))
  // if (token) console.log(`sol: ${token[0] / 1e9}, token: ${token[1]}`)
  console.log(preBalances?.filter((a) => [456770880, 457104960].includes(a)))
  // console.log(preBalances?.filter((_, i) => [16, 17].includes(i)))
  console.log(getRepeatedDigits(preBalances!))
  console.log(`https://solscan.io/tx/${sig}`)

  // console.log(util.inspect(innerInstructions2, false, 10, true))
}

const s0 = async (pubkey: PublicKey, limit: number) => connection.getSignaturesForAddress(pubkey, { limit })

const s1 = new PublicKey('8qGLRfAgJRDNJKRL4tFn5ENRifYpksbv38KbASihHxXY')
const s2 = 1
const s3 = async (arr: string[]) => connection.getParsedTransactions(arr, { maxSupportedTransactionVersion: 0 })
s0(...[s1, s2]).then((d) => {
  const sigs = d.map((d) => d.signature)
  console.log(sigs)
  swapData(sigs[0])
})
// .then((d) => {
//   const a1 = d[3]?.meta?.innerInstructions?.map((d) => d.instructions)
//   const a2 = a1?.flat()
//   if (a2) {
//     const a3 = a2.map((d: any) => d.parsed)
//     console.log(a3)
//   }
// })
