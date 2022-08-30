import { BN, utils } from '@project-serum/anchor'
import * as web3 from '@solana/web3.js'
import {
  EMPLOYER_SEED,
  ESCROW_SEED,
  JOB_SEED,
  KHOJ_CONTRACT_PROGRAM_ADDRESS,
  KHOJ_OWNER,
  PLATFORM_SEED,
  PROPOSAL_SEED,
  STAKE_SEED,
  TALENT_SEED,
} from './constants'

export const findPlatformId = async (): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode(PLATFORM_SEED),
      new web3.PublicKey(KHOJ_OWNER).toBuffer(),
    ],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findEmployerId = async (
  wallet: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(EMPLOYER_SEED), wallet.toBuffer()],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findTalentId = async (
  wallet: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(TALENT_SEED), wallet.toBuffer()],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findStakeId = async (
  address: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(STAKE_SEED), address.toBuffer()],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findJobId = async (
  userId: web3.PublicKey,
  id: BN
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode(JOB_SEED),
      userId.toBuffer(),
      id.toArrayLike(Buffer, 'le', 8),
    ],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findProposalId = async (
  jobId: web3.PublicKey,
  user: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(PROPOSAL_SEED), jobId.toBuffer(), user.toBuffer()],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findEscrowId = async (
  jobId: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(ESCROW_SEED), jobId.toBuffer()],
    KHOJ_CONTRACT_PROGRAM_ADDRESS
  )
}
