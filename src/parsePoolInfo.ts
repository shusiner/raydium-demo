import { Connection, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenAccount, SPL_ACCOUNT_LAYOUT, LIQUIDITY_STATE_LAYOUT_V4 } from '@raydium-io/raydium-sdk'
import { OpenOrders } from '@project-serum/serum'
import BN from 'bn.js'
import { connection } from '../config'
import { readJson } from './readJson'

async function getTokenAccounts(connection: Connection, owner: PublicKey) {
  const tokenResp = await connection.getTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  })

  const accounts: TokenAccount[] = []
  for (const { pubkey, account } of tokenResp.value) {
    accounts.push({
      programId: pubkey,
      pubkey,
      accountInfo: SPL_ACCOUNT_LAYOUT.decode(account.data),
    })
  }

  return accounts
}

// raydium pool id can get from api: https://api.raydium.io/v2/sdk/liquidity/mainnet.json
// let SOL_USDC_POOL_ID = '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'
let BASE_QUOTE_POOL_ID = '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'
BASE_QUOTE_POOL_ID = 'KoLAkrhnnSuUbXuKKCoq91qhoBubYRZNn6Mz6Rft1BS' 
BASE_QUOTE_POOL_ID = 'EVzLJhqMtdC1nPmz8rNd6xGfVjDPxpLZgq7XJuNfMZ6'
BASE_QUOTE_POOL_ID = 'Cf628kRZSmUb5VZf6KGpRDRRxWRT8b4vLuYPEtLs73WD'
// BASE_QUOTE_POOL_ID = '5QhCHadyqPnsuxtaWyRwrbMWwPojq3W7cL79zSf8QC2i' 

BASE_QUOTE_POOL_ID = '7NKJEjnmbo8CnwQHPVunPbQMqZtSDogej3RwY5rgEVV4' // replace pool id
BASE_QUOTE_POOL_ID = readJson().poolId // replace pool id

const OPENBOOK_PROGRAM_ID = new PublicKey('srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX')

export async function parsePoolInfo() {
  //   const owner = new PublicKey('VnxDzsZ7chE88e9rB6UKztCt2HUwrkgCTx8WieWf5mM')

  //   const tokenAccounts = await getTokenAccounts(connection, owner)

  // example to get pool info
  const info = await connection.getAccountInfo(new PublicKey(BASE_QUOTE_POOL_ID))
  if (!info) return

  const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data)
  const openOrders = await OpenOrders.load(
    connection,
    poolState.openOrders,
    OPENBOOK_PROGRAM_ID // OPENBOOK_PROGRAM_ID(marketProgramId) of each pool can get from api: https://api.raydium.io/v2/sdk/liquidity/mainnet.json //May not be revelant here as there is only one openbook id for all transactions
  )
  const openTimeStamp = poolState.poolOpenTime.toNumber() * 1000
  const date = new Date(openTimeStamp)
  console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
  //   console.log(poolState.lpMint)
  //   console.log(poolState.lpReserve)
  //   console.log(poolState.lpVault)
  //   console.log(openOrders)

  const baseDecimal = 10 ** poolState.baseDecimal.toNumber() // e.g. 10 ^ 6
  const quoteDecimal = 10 ** poolState.quoteDecimal.toNumber()

  const baseTokenAmount = await connection.getTokenAccountBalance(poolState.baseVault)
  const quoteTokenAmount = await connection.getTokenAccountBalance(poolState.quoteVault)

  const basePnl = poolState.baseNeedTakePnl.toNumber() / baseDecimal
  const quotePnl = poolState.quoteNeedTakePnl.toNumber() / quoteDecimal

  const openOrdersBaseTokenTotal = openOrders.baseTokenTotal.toNumber() / baseDecimal
  const openOrdersQuoteTokenTotal = openOrders.quoteTokenTotal.toNumber() / quoteDecimal

  const base = (baseTokenAmount.value?.uiAmount || 0) + openOrdersBaseTokenTotal - basePnl
  const quote = (quoteTokenAmount.value?.uiAmount || 0) + openOrdersQuoteTokenTotal - quotePnl

  const denominator = new BN(10).pow(poolState.baseDecimal)

  //   const addedLpAccount = tokenAccounts.find((a) => a.accountInfo.mint.equals(poolState.lpMint))

  console.log(
    // 'pool info:',
    // '\npool total base ' + base,
    // '\npool total quote ' + quote,

    // '\nbase vault balance ' + baseTokenAmount.value.uiAmount,
    // '\nquote vault balance ' + quoteTokenAmount.value.uiAmount,

    // '\nbase tokens in openorders ' + openOrdersBaseTokenTotal,
    // '\nquote tokens in openorders  ' + openOrdersQuoteTokenTotal,

    // '\nbase token decimals ' + poolState.baseDecimal.toNumber(),
    // '\nquote token decimals ' + poolState.quoteDecimal.toNumber(),
    // '\ntotal lp ' + poolState.lpReserve.div(denominator).toString(),

    // '\nprice ' + quote / base,
    '\nPooled Sol ' + quote

    // 'addedLpAmount ' + (addedLpAccount?.accountInfo.amount.toNumber() || 0) / baseDecimal
  )
}
for (let i = 0; i < 300; i++) {
  const time = i * 1
  setTimeout(() => {
    parsePoolInfo()
    console.log(time)
  }, time * 1000)
}
