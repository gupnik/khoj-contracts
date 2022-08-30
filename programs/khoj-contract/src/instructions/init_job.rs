use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{Mint, Token},
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitJobIx {
    pub title: String,
    pub uri: String,
    pub price: u64,
    pub job_type: u8,
    pub category: String,
}

#[derive(Accounts)]
#[instruction(ix: InitJobIx)]
pub struct InitJobCtx<'info> {
    #[account(
        init,
        payer = creator,
        space = Job::size(ix),
        seeds = [JOB_PREFIX.as_bytes(), employer.key().as_ref(), employer.created_job_count.to_le_bytes().as_ref()],
        bump
    )]
    job: Account<'info, Job>,

    #[account(mut, constraint = employer.wallet == creator.key() @ErrorCode::Unauthorized)]
    employer: Account<'info, Employer>,

    #[account(mut)]
    price_mint: Box<Account<'info, Mint>>,

    #[account(mut)]
    creator: Signer<'info>,

    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitJobCtx>, ix: InitJobIx) -> Result<()> {
    let job = &mut ctx.accounts.job;
    let employer = &mut ctx.accounts.employer;

    job.bump = *ctx.bumps.get("job").unwrap();
    job.creator = ctx.accounts.creator.key();

    job.state = 0;
    job.title = ix.title;
    job.uri = ix.uri;
    job.proposal_count = 0;
    job.price = ix.price;
    job.price_mint = ctx.accounts.price_mint.key();
    job.accepted_proposal = Pubkey::default();

    employer.created_job_count += 1;

    Ok(())
}
