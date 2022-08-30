use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::Token,
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct SubmitWorkIx {}

#[derive(Accounts)]
#[instruction(ix: SubmitWorkIx)]
pub struct SubmitWorkCtx<'info> {
    #[account(mut, constraint = proposal.job == job.key() && proposal.state == 1 @ ErrorCode::InvalidProposal)]
    proposal: Account<'info, Proposal>,

    #[account(mut, constraint=job.state == 1 @ErrorCode::JobNotAvailable)]
    job: Account<'info, Job>,

    #[account(mut, constraint = proposal.proposer == proposer.key() @ErrorCode::Unauthorized)]
    proposer: Signer<'info>,

    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<SubmitWorkCtx>, _: SubmitWorkIx) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let job = &mut ctx.accounts.job;

    proposal.state = 2;
    job.state = 2;

    Ok(())
}
