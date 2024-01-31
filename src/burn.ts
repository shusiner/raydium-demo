import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js'
import { burnChecked, createBurnCheckedInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import * as bs58 from 'bs58'
import { connection, wallet } from '../config'
;(async () => {
  // connection
  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode('588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2')
  )

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const alice = Keypair.fromSecretKey(
    bs58.decode('4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp')
  )

  const mintPubkey = new PublicKey('G1GuR731QK5NM3sSJkvdKwYYQnU1RUoUXdvtYhsATtok') // LP token ca

  const tokenAccountPubkey = new PublicKey('2KjwPVRnGDfSEhvNxawj2syvFUm9jg1ZWEi6TeeDQXi1') // LP token account

  // 1) use build-in function slow
  // {
  //   let txhash = await burnChecked(
  //     connection, // connection
  //     wallet, // payer
  //     tokenAccountPubkey, // token account
  //     mintPubkey, // mint
  //     wallet, // owner
  //     1, // amount, if your deciamls is 8, 10^8 for 1 token
  //     6
  //   )
  //   console.log(`txhash: ${txhash}`)
  //   console.log(`https://solscan.io/tx/${txhash}`)
  // }

  // or

  // 2) compose by yourself
  {
    let tx = new Transaction().add(
      createBurnCheckedInstruction(
        tokenAccountPubkey, // token account
        mintPubkey, // mint
        wallet.publicKey, // owner of token account
        100, // amount, if your deciamls is 8, 10^8 for 1 token
        9 // decimals
      )
    )
    const txhash = await connection.sendTransaction(tx, [wallet, wallet /* fee payer + token authority */])
    console.log(`txhash: ${txhash}`)
    console.log(`https://solscan.io/tx/${txhash}`)
  }
})()
