import { BN, utils } from '@project-serum/anchor'
import { SignerWallet } from '@saberhq/solana-contrib'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { fail } from 'assert'

import * as splToken from '@solana/spl-token'
import { connectionFor } from './connection'
import dotenv from 'dotenv'

import { createJob, registerEmployer, updateEmployer } from '../src/apis'
import { executeTransaction, tryGetAccount } from '../src/utils'

import aidrop_key from '../airdrop.json'
import test_key from '../tests/test-key.json'
import { getEmployerData } from '../src/accounts'
import { findEmployerId } from '../src/pdas'

dotenv.config()

// const wallet = Keypair.fromSecretKey(new Uint8Array(aidrop_key))

const wallet = Keypair.fromSecretKey(new Uint8Array(test_key))

// console.log(utils.bytes.bs58.encode(wallet.secretKey));

const main = async (cluster = 'localnet') => {
  const connection = connectionFor(cluster)

  const employerData = await tryGetAccount(() =>
    getEmployerData(connection, wallet.publicKey)
  )

  const name = "Khoj";
  

  try {
    let transaction: Transaction;
    if (employerData) {
      // const [employerId] = await findEmployerId(wallet.publicKey);
      [transaction] = await updateEmployer(
        connection,
        new SignerWallet(wallet),
        {
          creator: wallet.publicKey,
          name
        }
      )
    } else {
      [transaction] = await registerEmployer(
        connection,
        new SignerWallet(wallet),
        {
          creator: wallet.publicKey,
          name
        }
      )
    }

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
