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
const str1 = '2Uuxm5Mf9n3wcpQahJkz9WQ8wzxnDHPJuf8dzjxG3Yzfp8sF9v4DUR5QXjZ7xpTcWHjavHUPJHd1eoQGqUsvnfQX'
getLPTransactionDetail(str1).then(console.log)