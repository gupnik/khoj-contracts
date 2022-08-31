import { BN, utils } from '@project-serum/anchor'
import { SignerWallet } from '@saberhq/solana-contrib'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { fail } from 'assert'

import * as splToken from '@solana/spl-token'
import { connectionFor } from './connection'
import dotenv from 'dotenv'

import { closeJob, createJob } from '../src/apis'
import { executeTransaction } from '../src/utils'

import aidrop_key from '../airdrop.json'
import test_key from '../tests/test-key.json'

dotenv.config()

// const wallet = Keypair.fromSecretKey(new Uint8Array(aidrop_key))

const wallet = Keypair.fromSecretKey(new Uint8Array(test_key))

// console.log(utils.bytes.bs58.encode(wallet.secretKey));

const main = async (cluster = 'localnet') => {
  const connection = connectionFor(cluster)

  try {
    const transaction = await closeJob(
      connection,
      new SignerWallet(wallet),
      {
        creator: wallet.publicKey,
        jobId: new PublicKey("DDY7VfQVzYKHo3KpFqkxYb3kSjiqMUMtE9FSrCDkZG2C")
      }
    )

    await executeTransaction(
      connection,
      new SignerWallet(wallet),
      transaction,
      {
        confirmOptions: {
          maxRetries: 3,
        },
      }
    )
  } catch (e) {
    console.log(e)
    fail
  }
}

main('devnet').catch((e) => console.log(e))
