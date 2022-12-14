import { BN } from '@project-serum/anchor'
import type { Connection, PublicKey, Transaction } from '@solana/web3.js'
import type { Wallet } from '@saberhq/solana-contrib'
import { tryGetAccount, withFindOrInitAssociatedTokenAccount } from './utils'
import {
  findAggregatorLinkId,
  findEmployerId,
  findEscrowId,
  findJobId,
  findPlatformId,
  findProposalId,
  findStakeId,
  findTalentId,
} from './pdas'
import {
  acceptProposalInstr,
  acceptWorkInstr,
  aggregateInstr,
  closeJobInstr,
  initEmployer,
  initJob,
  initPlatformInstr,
  initProposal,
  initTalent,
  restakeInstr,
  stakeInstr,
  submitWorkInstr,
  unstakeInstr,
  updateEmployerInstr,
  updateTalentInstr,
} from './instructions'
import {
  getEmployerData,
  getJobData,
  getPlatformData,
  getProposalData,
  getStakeData,
  getTalentData,
} from './accounts'

export const withInitPlatform = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    mintId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [platformId] = await findPlatformId()

  const creatorTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.mintId,
    params.creator,
    wallet.publicKey,
    true
  )

  transaction.add(
    await initPlatformInstr(connection, wallet, {
      ...params,
      platformId,
      creatorTA,
    })
  )
  return [transaction, platformId]
}

export const withInitEmployer = async (
  transaction: Transaction,
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
  const [employerId] = await findEmployerId(params.creator)

  transaction.add(
    await initEmployer(connection, wallet, {
      ...params,
      employerId,
    })
  )
  return [transaction, employerId]
}

export const withUpdateEmployer = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name?: string
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<[Transaction, PublicKey]> => {
  const [employerId] = await findEmployerId(params.creator)

  transaction.add(
    await updateEmployerInstr(connection, wallet, {
      ...params,
      employerId,
    })
  )
  return [transaction, employerId]
}

export const withAggregate = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    employer: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [aggregatorId] = await findEmployerId(params.creator)
  const [employerId] = await findEmployerId(params.employer)
  const [aggregatorLinkId] = await findAggregatorLinkId(aggregatorId, employerId);

  transaction.add(
    await aggregateInstr(connection, wallet, {
      ...params,
      aggregatorLinkId,
      aggregatorId,
      employerId
    })
  )
  return [transaction, aggregatorLinkId]
}

export const withInitTalent = async (
  transaction: Transaction,
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
  const [talentId] = await findTalentId(params.creator)

  transaction.add(
    await initTalent(connection, wallet, {
      ...params,
      talentId,
    })
  )
  return [transaction, talentId]
}

export const withUpdateTalent = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    name?: string
    pfpId?: PublicKey
    discordHandle?: string
    twitterHandle?: string
  }
): Promise<[Transaction, PublicKey]> => {
  const [talentId] = await findTalentId(params.creator)

  transaction.add(
    await updateTalentInstr(connection, wallet, {
      ...params,
      talentId,
    })
  )
  return [transaction, talentId]
}

export const withStake = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    staker: PublicKey
    amount: BN
  }
): Promise<[Transaction]> => {
  const platformData = await getPlatformData(connection)

  const [talentId] = await findTalentId(params.staker)
  const [stakeId] = await findStakeId(params.staker)

  const stakeAccount = await tryGetAccount(() =>
    getStakeData(connection, stakeId)
  )

  const stakeTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    stakeId,
    wallet.publicKey,
    true
  )

  const stakerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    params.staker,
    wallet.publicKey,
    true
  )

  if (!stakeAccount) {
    transaction.add(
      await stakeInstr(connection, wallet, {
        ...params,
        platformId: platformData.pubkey,
        talentId,
        stakeId,
        stakeTA,
        stakerTA,
      })
    )
  } else {
    transaction.add(
      await restakeInstr(connection, wallet, {
        ...params,
        platformId: platformData.pubkey,
        talentId,
        stakeId,
        stakeTA,
        stakerTA,
      })
    )
  }

  return [transaction]
}

export const withUnstake = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    staker: PublicKey
    amount: BN
  }
): Promise<[Transaction]> => {
  const platformData = await getPlatformData(connection)

  const [talentId] = await findTalentId(params.staker)
  const [stakeId] = await findStakeId(params.staker)

  const stakeTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    stakeId,
    wallet.publicKey,
    true
  )

  const stakerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    params.staker,
    wallet.publicKey,
    true
  )

  transaction.add(
    await unstakeInstr(connection, wallet, {
      ...params,
      platformId: platformData.pubkey,
      talentId,
      stakeId,
      stakeTA,
      stakerTA,
    })
  )

  return [transaction]
}

export const withInitJob = async (
  transaction: Transaction,
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
  const [employerId] = await findEmployerId(params.creator)

  const employerData = await tryGetAccount(() =>
    getEmployerData(connection, params.creator)
  )

  if (!employerData) {
    transaction.add(
      await initEmployer(connection, wallet, {
        creator: params.creator,
        name: '',
        uri: '',
        employerId: employerId,
      })
    )
  }
  const jobCount = employerData?.parsed.createdJobCount || new BN(0)
  const [jobId] = await findJobId(employerId, jobCount)

  transaction.add(
    await initJob(connection, wallet, {
      creator: params.creator,
      title: params.title,
      category: params.category,
      uri: params.uri,
      employerId: employerId,
      jobId: jobId,
      price: params.price,
      priceMint: params.priceMint,
    })
  )
  return [transaction, jobId]
}

export const withCloseJob = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    creator: PublicKey
    jobId: PublicKey
  }
): Promise<Transaction> => {
  transaction.add(
    await closeJobInstr(connection, wallet, {
      creator: params.creator,
      jobId: params.jobId,
    })
  )
  return transaction
}

export const withInitProposal = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    proposer: PublicKey
    uri: string
    price: BN
    jobId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [talentId] = await findTalentId(params.proposer)

  const talentData = await tryGetAccount(() =>
    getTalentData(connection, params.proposer)
  )

  if (!talentData) {
    transaction.add(
      await initTalent(connection, wallet, {
        creator: params.proposer,
        name: '',
        uri: '',
        skills: [],
        talentId: talentId,
      })
    )
  }

  const [proposalId] = await findProposalId(params.jobId, params.proposer)

  transaction.add(
    await initProposal(connection, wallet, {
      uri: params.uri,
      jobId: params.jobId,
      proposalId: proposalId,
      talentId,
      price: params.price,
    })
  )
  return [transaction, proposalId]
}

export const withAcceptProposal = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    authority: PublicKey
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  const jobData = await getJobData(connection, params.jobId)
  const [escrowId] = await findEscrowId(params.jobId)

  const escrowTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    escrowId,
    wallet.publicKey,
    true
  )

  const authorityTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    params.authority,
    wallet.publicKey,
    true
  )

  transaction.add(
    await acceptProposalInstr(connection, wallet, {
      ...params,
      escrowId,
      escrowTA,
      authorityTA,
    })
  )

  return [transaction]
}

export const withSubmitWork = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  transaction.add(
    await submitWorkInstr(connection, wallet, {
      ...params,
    })
  )

  return [transaction]
}

export const withAcceptWork = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    authority: PublicKey
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  const jobData = await getJobData(connection, params.jobId)
  const proposalData = await getProposalData(connection, params.proposalId)

  const [escrowId] = await findEscrowId(params.jobId)

  const escrowTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    escrowId,
    wallet.publicKey,
    true
  )

  const proposerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    proposalData.parsed.proposer,
    wallet.publicKey,
    true
  )

  transaction.add(
    await acceptWorkInstr(connection, wallet, {
      ...params,
      escrowId,
      escrowTA,
      proposerTA,
    })
  )

  return [transaction]
}
