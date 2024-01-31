import { MarketV2, Token } from '@raydium-io/raydium-sdk'
import { Keypair } from '@solana/web3.js'

import { connection, DEFAULT_TOKEN, makeTxVersion, PROGRAMIDS, wallet } from '../config'
import { buildAndSendTx } from './util'
import BN from 'bn.js'

type TestTxInputInfo = {
  baseToken: Token
  quoteToken: Token
  wallet: Keypair
}

const pubkey = PROGRAMIDS.OPENBOOK_MARKET
const bn = new BN(10)
export async function createMarket(input: TestTxInputInfo) {
  // -------- step 1: make instructions --------
  const createMarketInstruments = await MarketV2.makeCreateMarketInstruction({
    connection,
    wallet: input.wallet.publicKey,
    marketInfo: {
      programId: PROGRAMIDS.OPENBOOK_MARKET,
      id: { publicKey: pubkey, seed: 'string' },
      baseMint: pubkey,

      quoteMint: pubkey,
      baseVault: { publicKey: pubkey, seed: 'string' },
      quoteVault: { publicKey: pubkey, seed: 'string' },
      vaultOwner: pubkey,

      requestQueue: { publicKey: pubkey, seed: 'string' },
      eventQueue: { publicKey: pubkey, seed: 'string' },
      bids: { publicKey: pubkey, seed: 'string' },
      asks: { publicKey: pubkey, seed: 'string' },

      feeRateBps: 1,
      vaultSignerNonce: bn,
      quoteDustThreshold: bn,

      baseLotSize: bn,
      quoteLotSize: bn,
    },
  })

  return { txids: await buildAndSendTx(createMarketInstruments.innerTransactions) }
}

async function howToUse() {
  const baseToken = DEFAULT_TOKEN.RAY // RAY
  const quoteToken = DEFAULT_TOKEN.USDC // USDC

  createMarket({
    baseToken,
    quoteToken,
    wallet: wallet,
  }).then(({ txids }) => {
    /** continue with txids */
    console.log('txids', txids)
  })
}
