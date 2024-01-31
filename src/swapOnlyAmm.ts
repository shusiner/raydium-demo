import assert from 'assert'

import {
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeys,
  Percent,
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
  outputToken: Token
  targetPool: string
  inputTokenAmount: TokenAmount
  slippage: Percent
  walletTokenAccounts: WalletTokenAccounts
  wallet: Keypair
}

async function swapOnlyAmm(input: TestTxInputInfo) {
  // -------- pre-action: get pool info --------
  const targetPoolInfo = await formatAmmKeysById(input.targetPool)
  assert(targetPoolInfo, 'cannot find the target pool')
  const poolKeys = jsonInfo2PoolKeys(targetPoolInfo) as LiquidityPoolKeys

  // -------- step 1: coumpute amount out --------
  const { amountOut, minAmountOut } = Liquidity.computeAmountOut({
    poolKeys: poolKeys,
    poolInfo: await Liquidity.fetchInfo({ connection, poolKeys }),
    amountIn: input.inputTokenAmount,
    currencyOut: input.outputToken,
    slippage: input.slippage,
  })

  // -------- step 2: create instructions by SDK function --------
  const { innerTransactions } = await Liquidity.makeSwapInstructionSimple({
    connection,
    poolKeys,
    userKeys: {
      tokenAccounts: input.walletTokenAccounts,
      owner: input.wallet.publicKey,
    },
    amountIn: input.inputTokenAmount,
    amountOut: minAmountOut,
    fixedSide: 'in',
    makeTxVersion,
  })

  console.log('amountOut:', amountOut.toFixed(), '  minAmountOut: ', minAmountOut.toFixed())
  console.log(
    'amountOut:',
    parseFloat(amountOut.toFixed()) * 1e9,
    '  minAmountOut: ',
    parseFloat(minAmountOut.toFixed()) * 1e9
  )

  return { txids: await buildAndSendTx(innerTransactions) }
}

// inputToken = DEFAULT_TOKEN.USDC
// let targetPool = 'EVzLJhqMtdC1nPmz8rNd6xGfVjDPxpLZgq7XJuNfMZ6' // USDC-RAY pool

// parameters
let outputToken = DEFAULT_TOKEN.WSOL 
let inputToken = DEFAULT_TOKEN.WSOL
let targetPool = 'C8W1Y7R78WLvCeuGSsexP1ym1fisqvGfctunq86Phzdu' // change target pool
let t1PubKey = new PublicKey('2Y3rQh4CbVqxS2u927pQNXKLou7xwzvXpLgmhKyjTcYr') // change token
// outputToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, 'output', 'output')
inputToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, 'input', 'input')
const inputTokenAmount = new TokenAmount(inputToken, 115000000e6) // change input amount
const slippage = new Percent(200, 1000)
// outputToken = DEFAULT_TOKEN.RAY

async function howToUse() {
  const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)

  swapOnlyAmm({
    outputToken,
    targetPool,
    inputTokenAmount,
    slippage,
    walletTokenAccounts,
    wallet: wallet,
  }).then(({ txids }) => {
    /** continue with txids */

    console.log('txids', txids)
    console.log(`https://solscan.io/tx/${txids}`)
  })
}

howToUse()
