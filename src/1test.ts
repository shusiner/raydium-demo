import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import util from 'util'

const s0 = async (pubkey: PublicKey, limit: number) => connection.getSignaturesForAddress(pubkey, { limit })

const s1 = new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5')
const s2 = 4
const s3 = async (arr: string[]) => connection.getParsedTransactions(arr, { maxSupportedTransactionVersion: 0 })
s0(...[s1, s2])
  .then((d) => s3(d.map((d) => d.signature)))
  .then((d) => {
    const a1 = d[3]?.meta?.innerInstructions?.map((d) => d.instructions)
    const a2 = a1?.flat()
    if (a2) {
      const a3 = a2.map((d: any) => d.parsed)
      console.log(a3)
    }
  })
