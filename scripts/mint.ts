import { utils } from '@project-serum/anchor'
import { SignerWallet } from '@saberhq/solana-contrib'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { fail } from 'assert'

import * as splToken from '@solana/spl-token'
import { connectionFor } from './connection'
import dotenv from 'dotenv'

import { withInitPlatform } from '../src/transactions'
import { executeTransaction } from '../src/utils'

import aidrop_key from '../airdrop.json'
import test_key from '../tests/test-key.json'
import { getPlatformData } from '../src/accounts'

dotenv.config()

const wallet = Keypair.fromSecretKey(new Uint8Array(aidrop_key))

const owner_wallet = Keypair.fromSecretKey(new Uint8Array(test_key))

// console.log(utils.bytes.bs58.encode(wallet.secretKey));

const main = async (cluster = 'localnet') => {
  const connection = connectionFor(cluster)
  const platformData = await getPlatformData(connection)

  const mint = new splToken.Token(
    connection,
    platformData.parsed.mint,
    splToken.TOKEN_PROGRAM_ID,
    wallet
  )
  const amount = 100000000000

  const tokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    wallet.publicKey
  )

  await mint.mintTo(tokenAccount.address, wallet.publicKey, [], amount)
  return

  const transaction = new Transaction()

  try {
    const [_, platformId] = await withInitPlatform(
      transaction,
      connection,
      new SignerWallet(owner_wallet),
      {
        mintId: mint.publicKey,
      }
    )
    console.log(platformId.toBase58())

    await executeTransaction(
      connection,
      new SignerWallet(owner_wallet),
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
