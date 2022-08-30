import * as anchor from '@project-serum/anchor'
import { Transaction, PublicKey, Keypair } from '@solana/web3.js'
import chai, { assert, expect } from 'chai'
import { chaiSolana, expectTXTable } from '@saberhq/chai-solana'
import {
  SignerWallet,
  SolanaProvider,
  TransactionEnvelope,
} from '@saberhq/solana-contrib'
import { createJob } from '../src/apis'
import { createMint } from './utils'
import type * as splToken from '@solana/spl-token'
import { BN } from 'bn.js'
import { getJobData } from '../src/accounts'

chai.use(chaiSolana)

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('neo', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const mintAuthority = Keypair.generate()
  let priceMint: splToken.Token
  let creatorTokenAccount: PublicKey

  const title = 'aad-dffdf-1'

  before(async () => {
    ;[creatorTokenAccount, priceMint] = await createMint(
      provider.connection,
      mintAuthority,
      provider.wallet.publicKey,
      100,
      mintAuthority.publicKey
    )
  })

  it('creates job', async () => {
    const [transaction, jobId] = await createJob(
      provider.connection,
      provider.wallet,
      {
        title: 'Sample',
        uri: title,
        price: new BN(10),
        priceMint: priceMint.publicKey,
      }
    )

    await expectTXTable(
      new TransactionEnvelope(SolanaProvider.init(provider), [
        ...transaction.instructions,
      ]),
      'Creates Job',
      {
        verbosity: 'always',
      }
    ).to.be.fulfilled

    const jobData = await getJobData(provider.connection, jobId)
    expect(jobData.parsed.price.toNumber()).to.equal(10)
  })
})
