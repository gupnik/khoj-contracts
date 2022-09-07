import type { BN } from '@project-serum/anchor'
import type { Wallet } from '@saberhq/solana-contrib'
import type { Connection } from '@solana/web3.js'
import { PublicKey, Transaction } from '@solana/web3.js'
import {
  withAcceptProposal,
  withAcceptWork,
  withAggregate,
  withCloseJob,
  withInitEmployer,
  withInitJob,
  withInitProposal,
  withInitTalent,
  withStake,
  withSubmitWork,
  withUnstake,
  withUpdateEmployer,
  withUpdateTalent,
} from './transactions'

export const registerEmployer = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name: string
    uri: string
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return withInitEmployer(transaction, connection, wallet, params)
}

export const aggregate = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    employer: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return await withAggregate(transaction, connection, wallet, params)
}

export const updateEmployer = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name?: string
    pfpId?: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return await withUpdateEmployer(transaction, connection, wallet, params)
}

export const registerTalent = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name: string
    uri: string
    skills: string[]
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return withInitTalent(transaction, connection, wallet, params)
}

export const updateTalent = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name?: string
    pfpId?: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return await withUpdateTalent(transaction, connection, wallet, params)
}

export const stake = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    staker: PublicKey
    amount: BN
  }
): Promise<Transaction> => {
  let transaction = new Transaction()

  ;[transaction] = await withStake(transaction, connection, wallet, params)

  return transaction
}

export const unstake = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    staker: PublicKey
    amount: BN
  }
): Promise<Transaction> => {
  let transaction = new Transaction()

  ;[transaction] = await withUnstake(transaction, connection, wallet, params)

  return transaction
}

export const createJob = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    title: string
    category: string
    uri: string
    price: BN
    priceMint: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return await withInitJob(transaction, connection, wallet, params)
}

export const closeJob = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    jobId: PublicKey
  }
): Promise<Transaction> => {
  const transaction = new Transaction()

  return await withCloseJob(transaction, connection, wallet, params)
}

export const createProposal = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    proposer: PublicKey
    uri: string
    price: BN
    jobId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const transaction = new Transaction()

  return await withInitProposal(transaction, connection, wallet, params)
}

export const acceptProposal = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    authority: PublicKey
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withAcceptProposal(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction]
}

export const submitWork = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withSubmitWork(transaction, connection, wallet, params)

  return [transaction]
}

export const acceptWork = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    authority: PublicKey
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withAcceptWork(transaction, connection, wallet, params)

  return [transaction]
}
