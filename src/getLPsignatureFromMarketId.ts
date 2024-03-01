import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import { getLPOBJInfo } from './getTokenInfo'
import getLPTransactionDetail from './getLPTransactionDetail'

export async function getSignature(lpAddress: string) {
  const lpKey = new PublicKey(lpAddress)

  try {
    let signatures = await connection.getSignaturesForAddress(lpKey)
    // console.log(signatures)
    let length = signatures.length
    let sig = signatures[signatures.length - 1]

    console.log(sig, length)
    if (length < 1000) return sig
    while (length == 1000) {
      signatures = await connection.getSignaturesForAddress(lpKey, { before: sig.signature })
      length = signatures.length
      sig = signatures[signatures.length - 1]
      console.log(sig, length)
    }

    return sig.signature
  } catch (error) {
    throw new Error(`Error fetching token supply: ${error}`)
  }
}

getSignature('EhoF52UXqCa4AhBrFBWcktQ58wsbb1YwPxt5HxtW4hfD').then((sig) => {
  const str1 = (sig as any).signature as string
  getLPTransactionDetail(str1).then(console.log)
})

// export default async function getLPTransactionDetail2(sig: string) {
//   const sig3 = await connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 })
//   console.log(sig3)
//   // if (sig3) console.log(getLPOBJInfo([sig3 as any]))
// }
// const str1 = '3mFgouBJiG8ccvxfYqtJfbYw2wUpXn5oRKoq2qAvbWpcTKURxbn932f31yq1o3r9zB4gEW94gQEqruBBCqKSpkZM'
// getLPTransactionDetail(str1)
