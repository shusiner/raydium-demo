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
import { readJson } from './readJson'

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
    computeBudgetConfig: { microLamports: 200000, units: 600000 },
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
let targetPool = readJson().poolId // change target pool
let t1PubKey = new PublicKey(readJson().mint) // change token

// outputToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, 'output', 'output')
inputToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, 'input', 'input')
const inputTokenAmount = new TokenAmount(inputToken, 10000000e6) // change input amount
const slippage = new Percent(100, 1000) // 20%?
// outputToken = DEFAULT_TOKEN.RAY

const fetchMarketIdBaseOnCA = async (ca: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Go-http-client/2.0',
      authorization: 'v19e8e10c92b8de1209nce',
      'Accept-Encoding': 'gzip',
    },
  }

  const data = await fetch(`https://spl-token-data.vercel.app/api/hello3?ca=${ca}`, options)
  const jsonData = await data.json()
  // console.log(jsonData)
  return jsonData.quoteMint.id
}

async function howToUse() {
  const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)
  // const promise = walletTokenAccounts.map(async ({ accountInfo: { mint, amount } }) => ({
  //   mint: mint.toString(),
  //   amount: amount.toNumber(),
  //   market: await fetchMarketIdBaseOnCA(mint.toString()),
  // }))

  // const walletTokenAccounts2 = await Promise.all(promise)
  // console.log(walletTokenAccounts2)
  // console.log(walletTokenAccounts)

  if (true)
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
      // setTimeout(async () => {
      //   const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)
      //   console.log(walletTokenAccounts.map(({ accountInfo: { mint, amount } }) => ({ mint, amount: amount.toNumber() })))
      // }, 10000)
    })
}

howToUse()
