import assert from 'assert'

import {
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeys,
  Token,
  TOKEN_PROGRAM_ID,
  TokenAmount,
} from '@raydium-io/raydium-sdk'
import { Keypair, PublicKey } from '@solana/web3.js'

import { connection, DEFAULT_TOKEN, makeTxVersion, wallet } from '../config'
import { formatAmmKeysById } from './formatAmmKeysById'
import { buildAndSendTx, getWalletTokenAccount } from './util'

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>
type TestTxInputInfo = {
  removeLpTokenAmount: TokenAmount
  targetPool: string
  walletTokenAccounts: WalletTokenAccounts
  wallet: Keypair
}

async function ammRemoveLiquidity(input: TestTxInputInfo) {
  // -------- pre-action: fetch basic info --------
  const targetPoolInfo = await formatAmmKeysById(input.targetPool)
  assert(targetPoolInfo, 'cannot find the target pool')

  // -------- step 1: make instructions --------
  const poolKeys = jsonInfo2PoolKeys(targetPoolInfo) as LiquidityPoolKeys
  const removeLiquidityInstructionResponse = await Liquidity.makeRemoveLiquidityInstructionSimple({
    connection,
    poolKeys,
    userKeys: {
      owner: input.wallet.publicKey,
      payer: input.wallet.publicKey,
      tokenAccounts: input.walletTokenAccounts,
    },
    amountIn: input.removeLpTokenAmount,
    makeTxVersion,
  })

  return { txids: await buildAndSendTx(removeLiquidityInstructionResponse.innerTransactions) }
}

let lpToken = DEFAULT_TOKEN['RAY_USDC-LP'] // LP
let targetPool = 'EVzLJhqMtdC1nPmz8rNd6xGfVjDPxpLZgq7XJuNfMZ6' // RAY-USDC pool
let t1PubKey = new PublicKey('HLXX6wdcR9nrxMwo2iSiozWpLdVHx3FWviDM2M3tF4Yf') //Replace LP token ca
lpToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, '', '')
targetPool = 'Hev8eETZLtbZ8WmB8s9ThxVmh6ZuUsrs2yBT2dr3gmMP' // Replace Pool ID
const removeLpTokenAmount = new TokenAmount(lpToken, 3605550275463) // Replace token amt

async function howToUse() {
  const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)
  ammRemoveLiquidity({
    removeLpTokenAmount,
    targetPool,
    walletTokenAccounts,
    wallet: wallet,
  }).then(({ txids }) => {
    /** continue with txids */
    console.log('txids', txids)
    console.log(`https://solscan.io/tx/${txids}`)
  })
}
howToUse()
