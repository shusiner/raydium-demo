import { connection } from '../config'
import util from 'util'

export default async function getLPTransactionDetail(sig: string) {
  const sig3 = await connection.getParsedTransaction(sig, {
    maxSupportedTransactionVersion: 0,
    commitment: 'confirmed',
  })
  //   const sig4 = await connection.getTransaction(sig2, { maxSupportedTransactionVersion: 0 }) // doesn't seems to have any difference
  const acc1s = sig3?.meta?.postTokenBalances
  // console.log(acc1s)
  //   console.log(sig3)
  const poolId = sig3?.transaction.message.accountKeys[2].pubkey.toBase58()
  console.log(`PoolID: ${poolId}`)
  console.log(`https://solscan.io/account/${poolId}`)

  const lpca = acc1s?.filter((tb) => tb.accountIndex === 10)[0].mint
  const lpcaAmt = acc1s?.filter((tb) => tb.accountIndex === 10)[0].uiTokenAmount.amount
  const pooledSol = acc1s?.filter((tb) => tb.accountIndex === 6)[0].uiTokenAmount.uiAmount
  const mint = acc1s?.filter((tb) => tb.accountIndex === 5)[0].mint
  // 9Erryj2YTN5zcYqj5XxV1LRCxkH945Z4cXQCxNRYhoTe
  //   console.log(accs)
  return { poolId, mint, lpca, lpcaAmt, pooledSol }
  //   console.log(util.inspect(sig3, { showHidden: false, depth: null, colors: true }))
  // postTokenBalances
  //   ;('EPuryXBFCif5MWGtj1ENqCn5qoKbbHTLi4kvkNpMDwJX') // token ca
  //   ;('E79Kck8FyRutRgPpt6wxyk3psTjz6iprmZ9FsonVcyv3') // pool id
  //   ;('5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1')
}
// const sig = await connection.getSignaturesForAddress(pubkey, { limit: 1 })
// const sig2 = sig[0].signature
// console.log(sig2)
// console.log(`https://solscan.io/tx/${sig2}`)
// const sig2 = '2ED3mwi9gSYikq5FJvaTQGxPWaHKYQ6HxihSuVXNJBvoPfL2yazLcZGdNWcevAzqRpH9tCtKyhi2eRtETFNd4JZ5'

// https://solscan.io/tx/4p62ZiAidB3rjRHJoE7MdjtCwHVi2Xo1emCZdqyPhN6Dpwof8Udituw4KidE13oBqHJcUd7knQCvzfq1zvBVZjnq exception transaction with diff acc number
// const sig = '2ED3mwi9gSYikq5FJvaTQGxPWaHKYQ6HxihSuVXNJBvoPfL2yazLcZGdNWcevAzqRpH9tCtKyhi2eRtETFNd4JZ5'
// getSignaturesForAddress(sig).then((d) => console.log(d))
