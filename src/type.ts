export interface LPOBJ {
    accountData: AccountDaum[];
    description: string;
    events: Events;
    fee: number;
    feePayer: string;
    instructions: Instruction[];
    nativeTransfers: NativeTransfer[];
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: TokenTransfer[];
    transactionError: any;
    type: string;
  }
  
  export interface AccountDaum {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: TokenBalanceChange[];
  }
  
  export interface TokenBalanceChange {
    mint: string;
    rawTokenAmount: RawTokenAmount;
    tokenAccount: string;
    userAccount: string;
  }
  
  export interface RawTokenAmount {
    decimals: number;
    tokenAmount: string;
  }
  
  export interface Events {}
  
  export interface Instruction {
    accounts: string[];
    data: string;
    innerInstructions: InnerInstruction[];
    programId: string;
  }
  
  export interface InnerInstruction {
    accounts: string[];
    data: string;
    programId: string;
  }
  
  export interface NativeTransfer {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }
  
  export interface TokenTransfer {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }