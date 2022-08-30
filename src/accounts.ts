import { Connection, PublicKey } from '@solana/web3.js'
import {
  AnchorProvider,
  BorshAccountsCoder,
  Program,
} from '@project-serum/anchor'
import {
  AccountData,
  CREATOR_OFFSET,
  EmployerData,
  JobData,
  KHOJ_CONTRACT_PROGRAM_ADDRESS,
  KHOJ_IDL,
  KHOJ_PROGRAM,
  PlatformData,
  ProposalData,
  PROPOSAL_JOB_OFFSET,
  StakeData,
  TalentData,
} from './constants'
import { findEmployerId, findPlatformId, findTalentId } from './pdas'

export const getPlatformData = async (
  connection: Connection
): Promise<AccountData<PlatformData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const [platformId] = await findPlatformId()
  const parsed = await khojProgram.account.platform.fetch(platformId)
  return {
    parsed,
    pubkey: platformId,
  }
}

export const getEmployerData = async (
  connection: Connection,
  wallet: PublicKey
): Promise<AccountData<EmployerData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const [employerId] = await findEmployerId(wallet)
  const parsed = await khojProgram.account.employer.fetch(employerId)
  return {
    parsed,
    pubkey: wallet,
  }
}

export const getTalentData = async (
  connection: Connection,
  wallet: PublicKey
): Promise<AccountData<TalentData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const [talentId] = await findTalentId(wallet)
  const parsed = await khojProgram.account.talent.fetch(talentId)
  return {
    parsed,
    pubkey: wallet,
  }
}

export const getStakeData = async (
  connection: Connection,
  stakeId: PublicKey
): Promise<AccountData<StakeData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const parsed = await khojProgram.account.stake.fetch(stakeId)
  return {
    parsed,
    pubkey: stakeId,
  }
}

export const getJobData = async (
  connection: Connection,
  jobId: PublicKey
): Promise<AccountData<JobData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const parsed = await khojProgram.account.job.fetch(jobId)
  return {
    parsed,
    pubkey: jobId,
  }
}

export const getAvailableJobs = async (
  connection: Connection
): Promise<AccountData<JobData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )

  const jobDatas: AccountData<JobData>[] = []
  const coder = new BorshAccountsCoder(KHOJ_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: JobData = coder.decode('job', account.account.data)
      if (jobData) {
        jobDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return jobDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getCreatedJobsForUser = async (
  connection: Connection,
  user: PublicKey
): Promise<AccountData<JobData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [{ memcmp: { offset: CREATOR_OFFSET, bytes: user.toBase58() } }],
    }
  )

  const jobDatas: AccountData<JobData>[] = []
  const coder = new BorshAccountsCoder(KHOJ_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: JobData = coder.decode('job', account.account.data)
      if (jobData) {
        jobDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return jobDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getProposalData = async (
  connection: Connection,
  proposalId: PublicKey
): Promise<AccountData<ProposalData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const khojProgram = new Program<KHOJ_PROGRAM>(
    KHOJ_IDL,
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const parsed = await khojProgram.account.proposal.fetch(proposalId)
  return {
    parsed,
    pubkey: proposalId,
  }
}

export const getSubmittedProposalsForJob = async (
  connection: Connection,
  job: PublicKey
): Promise<AccountData<ProposalData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [
        { memcmp: { offset: PROPOSAL_JOB_OFFSET, bytes: job.toBase58() } },
      ],
    }
  )

  const proposalDatas: AccountData<ProposalData>[] = []
  const coder = new BorshAccountsCoder(KHOJ_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: ProposalData = coder.decode(
        'proposal',
        account.account.data
      )
      if (jobData) {
        proposalDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return proposalDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getSubmittedProposalsForUser = async (
  connection: Connection,
  user: PublicKey
): Promise<AccountData<ProposalData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    KHOJ_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [{ memcmp: { offset: CREATOR_OFFSET, bytes: user.toBase58() } }],
    }
  )

  const proposalDatas: AccountData<ProposalData>[] = []
  const coder = new BorshAccountsCoder(KHOJ_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: ProposalData = coder.decode(
        'proposal',
        account.account.data
      )
      if (jobData) {
        proposalDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return proposalDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}
