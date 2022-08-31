import type { BN } from '@project-serum/anchor'
import type {
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { SystemProgram } from '@solana/web3.js'
import type { Wallet } from '@saberhq/solana-contrib'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { KHOJ_CONTRACT_PROGRAM_ADDRESS, KHOJ_IDL, KHOJ_PROGRAM } from './constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const initPlatformInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    mintId: PublicKey
    creator: PublicKey
    creatorTA: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initPlatform({})
    .accounts({
      platform: params.platformId,
      mint: params.mintId,
      payerMintTokenAccount: params.creatorTA,
      payer: params.creator,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initEmployer = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name: string
    employerId: PublicKey
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initEmployer({
      name: params.name,
      pfp: params.pfpId || null,
      discordHandle: params.discordHandle || null,
      twitterHandle: params.twitterHandle || null
    })
    .accounts({
      employer: params.employerId,
      payer: params.creator,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const updateEmployerInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    employerId: PublicKey
    name?: string
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .updateEmployer({
      name: params.name || null,
      pfp: params.pfpId || null,
      discordHandle: params.discordHandle || null,
      twitterHandle: params.twitterHandle || null
    })
    .accounts({
      employer: params.employerId,
      payer: params.creator,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initTalent = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name: string
    talentId: PublicKey
    skills: string[]
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initTalent({
      name: params.name,
      pfp: params.pfpId || null,
      skills: params.skills,
      discordHandle: params.discordHandle || null,
      twitterHandle: params.twitterHandle || null
    })
    .accounts({
      talent: params.talentId,
      payer: params.creator,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const updateTalentInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    talentId: PublicKey
    name?: string
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .updateTalent({
      name: params.name || null,
      pfp: params.pfpId || null,
      discordHandle: params.discordHandle || null,
      twitterHandle: params.twitterHandle || null
    })
    .accounts({
      talent: params.talentId,
      payer: params.creator,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const stakeInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    talentId: PublicKey
    stakeId: PublicKey
    stakeTA: PublicKey
    stakerTA: PublicKey
    amount: BN
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .stake({
      amount: params.amount,
    })
    .accounts({
      platform: params.platformId,
      talent: params.talentId,
      stake: params.stakeId,
      stakeMintTokenAccount: params.stakeTA,
      payerMintTokenAccount: params.stakerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const restakeInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    talentId: PublicKey
    stakeId: PublicKey
    stakeTA: PublicKey
    stakerTA: PublicKey
    amount: BN
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .restake({
      amount: params.amount,
    })
    .accounts({
      platform: params.platformId,
      talent: params.talentId,
      stake: params.stakeId,
      stakeMintTokenAccount: params.stakeTA,
      payerMintTokenAccount: params.stakerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const unstakeInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    talentId: PublicKey
    stakeId: PublicKey
    stakeTA: PublicKey
    stakerTA: PublicKey
    amount: BN
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .unstake({
      amount: params.amount,
    })
    .accounts({
      platform: params.platformId,
      talent: params.talentId,
      stake: params.stakeId,
      stakeMintTokenAccount: params.stakeTA,
      payerMintTokenAccount: params.stakerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initJob = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    title: string
    uri: string
    category: string
    price: BN
    employerId: PublicKey
    jobId: PublicKey
    priceMint: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initJob({
      title: params.title,
      category: params.category,
      uri: params.uri,
      price: params.price,
      jobType: 0,
    })
    .accounts({
      job: params.jobId,
      priceMint: params.priceMint,
      employer: params.employerId,
      creator: params.creator,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const closeJobInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    jobId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .closeJob()
    .accounts({
      job: params.jobId,
      creator: params.creator
    })
    .instruction()
}

export const initProposal = (
  connection: Connection,
  wallet: Wallet,
  params: {
    uri: string
    price: BN
    jobId: PublicKey
    talentId: PublicKey
    proposalId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initProposal({
      uri: params.uri,
      price: params.price,
    })
    .accounts({
      job: params.jobId,
      proposal: params.proposalId,
      talent: params.talentId,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const acceptProposalInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
    escrowId: PublicKey
    escrowTA: PublicKey
    authority: PublicKey
    authorityTA: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .acceptProposal({})
    .accounts({
      escrow: params.escrowId,
      job: params.jobId,
      proposal: params.proposalId,
      escrowTokenAccount: params.escrowTA,
      authorityTokenAccount: params.authorityTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      authority: params.authority
    })
    .instruction()
}

export const submitWorkInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .submitWork({})
    .accounts({
      job: params.jobId,
      proposal: params.proposalId,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const acceptWorkInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
    escrowId: PublicKey
    escrowTA: PublicKey
    proposerTA: PublicKey
    authority: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .acceptWork({})
    .accounts({
      escrow: params.escrowId,
      escrowTokenAccount: params.escrowTA,
      proposal: params.proposalId,
      job: params.jobId,
      proposerTokenAccount: params.proposerTA,
      authority: params.authority,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}
