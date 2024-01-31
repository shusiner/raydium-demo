import { connection } from '../config'
import util from 'util'

export async function getSignaturesForAddress(sig: string) {
  const sig3 = await connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 })
  //   const sig4 = await connection.getTransaction(sig2, { maxSupportedTransactionVersion: 0 }) // doesn't seems to have any difference
  const acc1s = sig3?.meta?.postTokenBalances
  // console.log(acc1s)
  //   console.log(sig3)
  const poolId = sig3?.transaction.message.accountKeys[2].pubkey.toBase58()
  console.log(`PoolID: ${poolId}`)
  console.log(`https://solscan.io/account/${poolId}`)

  return { }
}
const sig = '2ED3mwi9gSYikq5FJvaTQGxPWaHKYQ6HxihSuVXNJBvoPfL2yazLcZGdNWcevAzqRpH9tCtKyhi2eRtETFNd4JZ5'
getSignaturesForAddress(sig).then((d) => console.log(d))
