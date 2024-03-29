import { BN } from 'bn.js'

import { Liquidity, MAINNET_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from '@raydium-io/raydium-sdk'
import { Keypair, PublicKey } from '@solana/web3.js'

import { connection, DEFAULT_TOKEN, makeTxVersion, PROGRAMIDS, wallet } from '../config'
import { buildAndSendTx, getWalletTokenAccount } from './util'
import getLPTransactionDetail from './getLPTransactionDetail'
import { writeJson } from './readJson'
import waitForTx from './waitForTx'
import waitForTxConfirmation from './waitForTxConfirmation'

const ZERO = new BN(0)
type BN = typeof ZERO

type CalcStartPrice = {
  addBaseAmount: BN
  addQuoteAmount: BN
}

function calcMarketStartPrice(input: CalcStartPrice) {
  return input.addBaseAmount.toNumber() / 10 ** 6 / (input.addQuoteAmount.toNumber() / 10 ** 6)
}

type LiquidityPairTargetInfo = {
  baseToken: Token
  quoteToken: Token
  targetMargetId: PublicKey
}

function getMarketAssociatedPoolKeys(input: LiquidityPairTargetInfo) {
  return Liquidity.getAssociatedPoolKeys({
    version: 4,
    marketVersion: 3,
    baseMint: input.baseToken.mint,
    quoteMint: input.quoteToken.mint,
    baseDecimals: input.baseToken.decimals,
    quoteDecimals: input.quoteToken.decimals,
    marketId: input.targetMargetId,
    programId: PROGRAMIDS.AmmV4,
    marketProgramId: MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
  })
}

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>
type TestTxInputInfo = LiquidityPairTargetInfo &
  CalcStartPrice & {
    startTime: number // seconds
    walletTokenAccounts: WalletTokenAccounts
    wallet: Keypair
  }

async function ammCreatePool(input: TestTxInputInfo): Promise<{ txids: string[] }> {
  // -------- step 1: make instructions --------
  const initPoolInstructionResponse = await Liquidity.makeCreatePoolV4InstructionV2Simple({
    connection,
    programId: PROGRAMIDS.AmmV4,
    marketInfo: {
      marketId: input.targetMargetId,
      programId: PROGRAMIDS.OPENBOOK_MARKET,
    },
    baseMintInfo: input.baseToken,
    quoteMintInfo: input.quoteToken,
    baseAmount: input.addBaseAmount,
    quoteAmount: input.addQuoteAmount,
    startTime: new BN(Math.floor(input.startTime)),
    ownerInfo: {
      feePayer: input.wallet.publicKey,
      wallet: input.wallet.publicKey,
      tokenAccounts: input.walletTokenAccounts,
      useSOLBalance: true,
    },
    associatedOnly: false,
    checkCreateATAOwner: true,
    makeTxVersion,
    feeDestinationId: new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5'), // only mainnet use this
    computeBudgetConfig: { microLamports: 3000000, units: 3000000 },
  })

  return { txids: await buildAndSendTx(initPoolInstructionResponse.innerTransactions) }
}

async function howToUse() {
  let baseToken = DEFAULT_TOKEN.USDC // USDC
  let quoteToken = DEFAULT_TOKEN.RAY // RAY
  let targetMargetId = Keypair.generate().publicKey

  targetMargetId = new PublicKey('4fbqFMePkf4fMrsEbgp3uG6GXbxXpQRHoHfzC3LDBwiK') //replace market id
  let t1PubKey = new PublicKey('5LerFFqPuSjwKvVsgQ1srPB5SdCnWtYj1TYSAsqxc2H3') //replace base token, //wallet secret key
  let addBaseAmount = new BN(840000000e6) // 10000 / 10 ** 6,  //replace amt
  // addBaseAmount = new BN(899999999e6) // 10000 / 10 ** 6,  //replace amt
  let addQuoteAmount = new BN(9e9) // 10000 / 10 ** 6,  //replace sol
  let startTime = Math.floor(Date.now() / 1000) + 0 //replace time
  baseToken = new Token(TOKEN_PROGRAM_ID, t1PubKey, 6, 'BASE', 'BASE')
  quoteToken = DEFAULT_TOKEN.WSOL

  // const startTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // start from 7 days later
  const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)

  /* do something with start price if needed */
  const startPrice = calcMarketStartPrice({ addBaseAmount, addQuoteAmount })

  /* do something with market associated pool keys if needed */
  const associatedPoolKeys = getMarketAssociatedPoolKeys({
    baseToken,
    quoteToken,
    targetMargetId,
  })
  // test
  // const txid = '5R1hLmmw8UrqVyfwjVrn6gVkLhjdatqfL36D3ncZEcjoqUiXzVMDo2y3bj2vuaeSK9LWBn7p4c7FuFZ4HaxRVitv'
  // writeJson({ txid }, 'data2.txt')

  if (true)
    ammCreatePool({
      startTime,
      addBaseAmount,
      addQuoteAmount,
      baseToken,
      quoteToken,
      targetMargetId,
      wallet,
      walletTokenAccounts,
    }).then(async ({ txids }) => {
      /** continue with txids */
      const txid = txids[0]
      writeJson({ txid }, 'data2.txt')
      const result = await waitForTxConfirmation(txid)
      console.log('txids', txids)
      console.log(`https://solscan.io/tx/${txids}`)
      if (!(result as any).err)
        getLPTransactionDetail(`${txid}`).then((d) => {
          writeJson(d, 'data.txt')
          console.log(d)
        })

      // if (txid)
      //   setTimeout(() => {
      //     getLPTransactionDetail(`${txid}`).then((d) => console.log(d))
      //   }, 15000)
    })
}

howToUse()
