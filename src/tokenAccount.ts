import { SPL_ACCOUNT_LAYOUT, TOKEN_PROGRAM_ID, TokenAccount } from '@raydium-io/raydium-sdk'
import { PublicKey } from '@solana/web3.js'
import { connection, wallet } from '../config'
import util from 'util'

async function getTokenAccounts(owner: PublicKey) {
  const tokenResp = await connection.getTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  })

  const accounts: TokenAccount[] = []
  for (const { pubkey, account } of tokenResp.value) {
    accounts.push({
      programId: pubkey,
      pubkey: pubkey,
      accountInfo: SPL_ACCOUNT_LAYOUT.decode(account.data),
    })
  }

  return accounts
}

getTokenAccounts(wallet.publicKey).then((data) => {
  // console.log(util.inspect(data, { showHidden: false, depth: null, colors: true }))
  const data1 = data
    .map((d) => d.accountInfo)
    .map(({ mint, amount }) => ({
      mint,
      amount: amount.toNumber(),
    }))
  console.log(data1)
})
