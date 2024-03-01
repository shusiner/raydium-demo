import { LIQUIDITY_STATE_LAYOUT_V4, struct, u64, u8 } from '@raydium-io/raydium-sdk'
import { getTotalTokenSupply, getTotalInfo } from './getTokenSupply'
import { PublicKey } from '@solana/web3.js'
import { connection } from '../config'
import bs58 from 'bs58'
import { isReturnStatement } from 'typescript'

export interface Root {
  accountData: AccountDaum[]
  description: string
  events: Events
  fee: number
  feePayer: string
  instructions: Instruction[]
  nativeTransfers: NativeTransfer[]
  signature: string
  slot: number
  source: string
  timestamp: number
  tokenTransfers: TokenTransfer[]
  transactionError: any
  type: string
}

export interface AccountDaum {
  account: string
  nativeBalanceChange: number
  tokenBalanceChanges: TokenBalanceChange[]
}

export interface TokenBalanceChange {
  mint: string
  rawTokenAmount: RawTokenAmount
  tokenAccount: string
  userAccount: string
}

export interface RawTokenAmount {
  decimals: number
  tokenAmount: string
}

export interface Events {}

export interface Instruction {
  accounts: string[]
  data: string
  innerInstructions: InnerInstruction[]
  programId: string
}

export interface InnerInstruction {
  accounts: string[]
  data: string
  programId: string
}

export interface NativeTransfer {
  amount: number
  fromUserAccount: string
  toUserAccount: string
}

export interface TokenTransfer {
  fromTokenAccount: string
  fromUserAccount: string
  mint: string
  toTokenAccount: string
  toUserAccount: string
  tokenAmount: number
  tokenStandard: string
}

const obj1 = [
  {
    accountData: [
      {
        account: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        nativeBalanceChange: -8743325561,
        tokenBalanceChanges: [],
      },
      {
        account: 'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL',
        nativeBalanceChange: 6124800,
        tokenBalanceChanges: [],
      },
      {
        account: 'HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw',
        nativeBalanceChange: 23357760,
        tokenBalanceChanges: [],
      },
      {
        account: '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
        nativeBalanceChange: 1461600,
        tokenBalanceChanges: [],
      },
      {
        account: '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
        nativeBalanceChange: 2039280,
        tokenBalanceChanges: [
          {
            mint: 'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: '80000000000000000',
            },
            tokenAccount: '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
            userAccount: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
          },
        ],
      },
      {
        account: 'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
        nativeBalanceChange: 8002039280,
        tokenBalanceChanges: [
          {
            mint: 'So11111111111111111111111111111111111111112',
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: '8000000000',
            },
            tokenAccount: 'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
            userAccount: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
          },
        ],
      },
      {
        account: 'AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj',
        nativeBalanceChange: 16258560,
        tokenBalanceChanges: [],
      },
      {
        account: '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5',
        nativeBalanceChange: 680000000,
        tokenBalanceChanges: [
          {
            mint: 'So11111111111111111111111111111111111111112',
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: '680000000',
            },
            tokenAccount: '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5',
            userAccount: 'GThUX1Atko4tqhN2NaiTazWSeFWMuiUvfFnyJyUghFMJ',
          },
        ],
      },
      {
        account: '3Wf9s4fMVAEtb5Yxezdqst1HAvdLa1ktBqrwkhShUszU',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [
          {
            mint: 'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: '-80000000000000000',
            },
            tokenAccount: '3Wf9s4fMVAEtb5Yxezdqst1HAvdLa1ktBqrwkhShUszU',
            userAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
          },
        ],
      },
      {
        account: '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
        nativeBalanceChange: 2039280,
        tokenBalanceChanges: [
          {
            mint: '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: '25297221281347',
            },
            tokenAccount: '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
            userAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
          },
        ],
      },
      {
        account: 'ComputeBudget111111111111111111111111111111',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: '11111111111111111111111111111111',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'So11111111111111111111111111111111111111112',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: '9DCxsMizn3H1hprZ7xWe6LDzeUeZBksYFpBWBtSf1PQX',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: '7TX7DXihfqonw18Tfvk9MqANVrNWRhESUMCVLTptKtQf',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'SysvarRent111111111111111111111111111111111',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: 'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
    ],
    description: '',
    events: {},
    fee: 10005001,
    feePayer: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
    instructions: [
      {
        accounts: [],
        data: '3LhnYDPbnPLs',
        innerInstructions: [],
        programId: 'ComputeBudget111111111111111111111111111111',
      },
      {
        accounts: [],
        data: 'JzwPro',
        innerInstructions: [],
        programId: 'ComputeBudget111111111111111111111111111111',
      },
      {
        accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', 'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3'],
        data: '3ipZWdBsaSpexao9PbsxzdmWwqx6KUzJ4mRG9B9xg6WR7N8TSPEDxFzKF2R1udFAbibFXeFHSvbvz3z3XnypVPXMWFMx9VLvi4tGKhp6vJooZSsCwyhjVtQ1KVEgiz8tcAkEvN23dAibBwn4dntD8TBZfp61HXtYcvyvaznSL',
        innerInstructions: [],
        programId: '11111111111111111111111111111111',
      },
      {
        accounts: [
          'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
          'So11111111111111111111111111111111111111112',
          '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
          'SysvarRent111111111111111111111111111111111',
        ],
        data: '2',
        innerInstructions: [],
        programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
      },
      {
        accounts: [
          'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
          '11111111111111111111111111111111',
          'SysvarRent111111111111111111111111111111111',
          'EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL',
          '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
          'HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw',
          '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
          'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
          'So11111111111111111111111111111111111111112',
          '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
          'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
          'AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj',
          '9DCxsMizn3H1hprZ7xWe6LDzeUeZBksYFpBWBtSf1PQX',
          '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5',
          'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
          '7TX7DXihfqonw18Tfvk9MqANVrNWRhESUMCVLTptKtQf',
          '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
          '3Wf9s4fMVAEtb5Yxezdqst1HAvdLa1ktBqrwkhShUszU',
          'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
          '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
        ],
        data: '4YbsLGZ6CskEwQm2WBoZGGzgXef45fqhqSQ',
        innerInstructions: [
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5'],
            data: '3Bxs4129tumjV7AX',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5'],
            data: 'J',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', 'AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj'],
            data: '3Bxs3zsXjYXEcY9D',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj'],
            data: '9krTDTC9CyNDTCP9',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj'],
            data: 'SYXsG5gxn13RGVJBuJ66WMvnpkuC3ZXmxCAkmzi1nLhi459e',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY'],
            data: '3Bxs4GxuFmUxu9wu',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY'],
            data: '9krTDE99A3SWNSHd',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY'],
            data: 'SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY', 'SysvarRent111111111111111111111111111111111'],
            data: '1D8qpeSmcAZXbhY6jAPqguwXxxrrFAnmcbUaH5dxdLLS3Ub',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog'],
            data: '3Bxs4h24hBtQy9rw',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog'],
            data: '9krTDU2LzCSUJuVZ',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog'],
            data: 'SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: [
              '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
              'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
              '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
              'SysvarRent111111111111111111111111111111111',
            ],
            data: '2',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', 'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ'],
            data: '3Bxs4h24hBtQy9rw',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ'],
            data: '9krTDU2LzCSUJuVZ',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ'],
            data: 'SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: [
              'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
              'So11111111111111111111111111111111111111112',
              '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
              'SysvarRent111111111111111111111111111111111',
            ],
            data: '2',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', 'EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL'],
            data: '3Bxs3zw7D1St6MtB',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL'],
            data: '9krTDga1qCiqxLs9',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL'],
            data: 'SYXsG5gxn13RGVJBuJ66WMvnpkuC3ZXmxCAkmzi1nLhi459e',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', 'HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw'],
            data: '3Bxs4BdXwcxHpZ19',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw'],
            data: '9krTDSXVJqcrnRvf',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw'],
            data: 'SYXsBrTzDsq3kLD1BhH4w6jQTUs6sbwfa7yN5CyH8syhMbj3',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: [
              'HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw',
              '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
              '7TX7DXihfqonw18Tfvk9MqANVrNWRhESUMCVLTptKtQf',
              'SysvarRent111111111111111111111111111111111',
            ],
            data: '1PEpEB',
            programId: 'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
          },
          {
            accounts: [
              '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
              '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
              '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
              '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
              '11111111111111111111111111111111',
              'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
            ],
            data: '1',
            programId: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
          },
          {
            accounts: ['8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY'],
            data: '84eT',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV', '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t'],
            data: '11119os1e9qSs2u7TsThXqkBSRVFxhmYaFKFZ1waB2X7armDmvK3p5GmLdUxYdg3h7QSrL',
            programId: '11111111111111111111111111111111',
          },
          {
            accounts: ['2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t'],
            data: 'P',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: ['2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t', '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY'],
            data: '6PQgrT8YRMcLGV5GEBxzTg3ouZeXB3J69ZJe24JZmX1fT',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: [
              '3Wf9s4fMVAEtb5Yxezdqst1HAvdLa1ktBqrwkhShUszU',
              '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
              '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
            ],
            data: '3DTZfvHXfCiU',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: [
              'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
              'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
              '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
            ],
            data: '3DWdH8D4uAPq',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            accounts: [
              '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
              '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
              '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
            ],
            data: '6N1XcQYvhFSo',
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
        ],
        programId: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
      },
      {
        accounts: [
          'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
          '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
          '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        ],
        data: 'A',
        innerInstructions: [],
        programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
      },
    ],
    nativeTransfers: [
      {
        amount: 680000000,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5',
      },
      {
        amount: 16258560,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: 'AfaX6touxw9Ao2KUjhjmNKURGud2t57Bijuhv4VF5kKj',
      },
      {
        amount: 1461600,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
      },
      {
        amount: 2039280,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
      },
      {
        amount: 2039280,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: 'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
      },
      {
        amount: 6124800,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: 'EKHUwXdc2zVsBuLWXaTucRVBSz69CMfX44iPBNcB5ExL',
      },
      {
        amount: 23357760,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: 'HLmZjLhwrBTXy35TGMvKiJ6dC3nTRMgvAwJgiKiaP4pw',
      },
      {
        amount: 2039280,
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        toUserAccount: '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
      },
    ],
    signature: '24jhpUTzgNqrCydZmu83fZcjeQwYdDJZXtrGSAXELSJPGj8nKwDdTfD5A4pTgbp91c77xjaRVdmvhZwvanMNc3Wj',
    slot: 245346259,
    source: 'RAYDIUM',
    timestamp: 1706737915,
    tokenTransfers: [
      {
        fromTokenAccount: '3Wf9s4fMVAEtb5Yxezdqst1HAvdLa1ktBqrwkhShUszU',
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        mint: 'BHvGgG1725oGi8Fp5T3fLxjDm5UudvGMCt1frYfHAMn3',
        toTokenAccount: '8z9Yzu94eFBP6chfUM42U19EPKSZ8yjFwKgK2TRqiMog',
        toUserAccount: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        tokenAmount: 80000000,
        tokenStandard: 'Fungible',
      },
      {
        fromTokenAccount: 'AN6rZckrULbvTyUPhWKd8QDWXZeyHXthCmTtqHdfQss3',
        fromUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        mint: 'So11111111111111111111111111111111111111112',
        toTokenAccount: 'GUpqALq5bHgSL6fBR6hZBBwnbSWsHua1mCYaJHntmuTZ',
        toUserAccount: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
        tokenAmount: 8,
        tokenStandard: 'Fungible',
      },
      {
        fromTokenAccount: '',
        fromUserAccount: '',
        mint: '8n8JF3krwYpbyXJudKGyhkkzNoZgfncKUKKrrFNcCPyY',
        toTokenAccount: '2oSTsfznUu3JUhS68yiuhu8s6T85vYHcTDYTDgpmKR1t',
        toUserAccount: '3GzBWw1d4m4SDbAi6oo8C5NX4kwMdYpSrPUAZisxDsEV',
        tokenAmount: 25297.221281347,
        tokenStandard: 'Fungible',
      },
    ],
    transactionError: null,
    type: 'CREATE_POOL',
  },
]

export const getTokenInfo = async (obj1: Root[]) => {
  const lpMarketId = obj1[0].accountData[2].account
  const inst = obj1[0].instructions[4].data
  const dataLayout = struct([u8('instruction'), u8('nonce'), u64('openTime'), u64('pcAmount'), u64('coinAmount')])

  // Sample hex instruction data (replace with your actual hex data)
  const base58String = inst

  const decodedBuffer = bs58.decode(base58String)

  // Convert the decoded buffer to a hexadecimal string
  const hexInstructionData = Buffer.from(decodedBuffer).toString('hex')

  // Create a Buffer from the hex data
  const instructionBuffer = Buffer.from(hexInstructionData, 'hex')

  // Deserialize the instruction data using the layout
  const decodedInstruction = dataLayout.decode(instructionBuffer)

  // console.log('Decoded Instruction:', decodedInstruction.openTime.toNumber())
  const openTimeStamp = decodedInstruction.openTime.toNumber()
  // const openTimeStamp2 = openTimeStamp * 1000
  // const date = new Date(openTimeStamp2)
  // console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
  // console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

  const quote = obj1[0].accountData[5].tokenBalanceChanges[0]
  const quoteMint = quote.mint
  const quoteData = quote.rawTokenAmount
  const base = obj1[0].accountData[6].tokenBalanceChanges[0]
  const baseMint = base.mint // 'So11111111111111111111111111111111111111112' assume sol
  const baseData = base.rawTokenAmount
  const lpToken = obj1[0].accountData[10].tokenBalanceChanges[0]
  const lpTokenMint = lpToken.mint
  const lpTokenData = lpToken.rawTokenAmount
  const timestamp = obj1[0].timestamp
  const signature = obj1[0].signature

  return {
    lpMarketId,
    quoteMint,
    quoteData,
    baseMint,
    baseData,
    lpTokenMint,
    lpTokenData,
    timestamp,
    signature,
    openTimeStamp,
  }
}

getTokenInfo(obj1).then((data) => {
  console.log(data)
  if (!data) isReturnStatement
  getTotalInfo(data.quoteMint).then((d2) => {
    console.log(d2)
    const quoteMintSupply = data?.quoteData.tokenAmount
    console.log(parseFloat(quoteMintSupply) / Number(d2.supply))
  })
})

// getTotalTokenSupply
// BABAMn9NA8KwD5zxMWRn6dKvHjgUqrr7fpwwUtxA8oek
// getTotalInfo('58UC31xFjDJhv1NnBF73mtxcsxN92SWjhYRzbfmvDREJ').then(console.log)

const dataLayout = struct([u8('instruction'), u8('nonce'), u64('openTime'), u64('pcAmount'), u64('coinAmount')])

// Sample hex instruction data (replace with your actual hex data)
const base58String = '4YNissfDooCRnkQJtNoDNWPzcUXa1kLWFE8'

const decodedBuffer = bs58.decode(base58String)

// Convert the decoded buffer to a hexadecimal string
const hexInstructionData = Buffer.from(decodedBuffer).toString('hex')

// Create a Buffer from the hex data
const instructionBuffer = Buffer.from(hexInstructionData, 'hex')

// Deserialize the instruction data using the layout
const decodedInstruction = dataLayout.decode(instructionBuffer)

console.log('Decoded Instruction:', decodedInstruction.openTime.toNumber())
