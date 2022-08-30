import type { AnchorTypes } from '@saberhq/anchor-contrib'
import { PublicKey } from '@solana/web3.js'
import * as KHOJ_CONTRACT_TYPES from './idl/khoj_contract'

export const KHOJ_CONTRACT_PROGRAM_ADDRESS = new PublicKey(
  'Fv3kJNVK6LDxnGsat7zgRcaEGNGEucfQKi9VEf5LdAxj'
)

export const KHOJ_OWNER = new PublicKey(
  'E1LMZ2rzvqh1dhDzUTDTn5Snk8p4wt9fc5rPA7M6ev2V'
)

export type KHOJ_PROGRAM = KHOJ_CONTRACT_TYPES.KhojContract

export const KHOJ_IDL = KHOJ_CONTRACT_TYPES.IDL

export type NeoTypes = AnchorTypes<KHOJ_PROGRAM>

export const PLATFORM_SEED = 'platform'
export const EMPLOYER_SEED = 'employer'
export const TALENT_SEED = 'talent'
export const STAKE_SEED = 'stake'
export const JOB_SEED = 'job'
export const PROPOSAL_SEED = 'proposal'
export const ESCROW_SEED = 'escrow'

export const CREATOR_OFFSET = 9
export const PROPOSAL_JOB_OFFSET = 41

type Accounts = NeoTypes['Accounts']

export type PlatformData = Accounts['platform']
export type EmployerData = Accounts['employer']
export type TalentData = Accounts['talent']
export type StakeData = Accounts['stake']
export type JobData = Accounts['job']
export type ProposalData = Accounts['proposal']
export type EscrowData = Accounts['escrow']

export type AccountData<T> = {
  pubkey: PublicKey
  parsed: T
}

export type AccountFn<T> = () => Promise<AccountData<T>>
