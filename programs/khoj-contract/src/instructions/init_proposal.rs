use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::Token,
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitProposalIx {
    pub uri: String,
    pub price: u64,
}

#[derive(Accounts)]
#[instruction(ix: InitProposalIx)]
pub struct InitProposalCtx<'info> {
    #[account(
        init,
        payer = proposer,
        space = Proposal::size(),
        seeds = [PROPOSAL_PREFIX.as_bytes(), job.key().as_ref(), proposer.key().as_ref()],
        bump
    )]
    proposal: Account<'info, Proposal>,

    #[account(mut, constraint=job.state == 0 @ErrorCode::JobNotAvailable)]
    job: Account<'info, Job>,

    #[account(mut, constraint = talent.wallet == proposer.key() @ErrorCode::Unauthorized)]
    talent: Account<'info, Talent>,

    #[account(mut)]
    proposer: Signer<'info>,

    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitProposalCtx>, ix: InitProposalIx) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let job = &mut ctx.accounts.job;
    let talent = &mut ctx.accounts.talent;

    proposal.bump = *ctx.bumps.get("proposal").unwrap();
    proposal.proposer = ctx.accounts.proposer.key();
    proposal.uri = ix.uri;
    proposal.price = ix.price;
    proposal.job = job.key();
    proposal.state = 0;
    proposal.created_at = Clock::get().unwrap().unix_timestamp;

    job.proposal_count += 1;
    talent.submitted_proposal_count += 1;

    Ok(())
}
