use anchor_lang::AccountsClose;

use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
};

#[derive(Accounts)]
pub struct CloseJobCtx<'info> {
    #[account(mut, constraint = job.state == 0 @ErrorCode::JobNotAvailable)]
    job: Account<'info, Job>,

    // #[account(mut, constraint = employer.wallet == creator.key() @ErrorCode::Unauthorized)]
    // employer: Account<'info, Employer>,
    #[account(mut, constraint = creator.key() == job.creator @ErrorCode::Unauthorized)]
    creator: Signer<'info>,
}

pub fn handler<'key, 'accounts, 'remaining, 'info>(
    ctx: Context<'key, 'accounts, 'remaining, 'info, CloseJobCtx<'info>>,
) -> Result<()> {
    // let job = &mut ctx.accounts.job;
    // let employer = ctx.accounts.employer;
    // let job_seed = [
    //     JOB_PREFIX.as_bytes(),
    //     employer.key().as_ref(),
    //     employer.created_job_count.to_le_bytes().as_ref(),
    //     &[job.bump],
    // ];
    // let job_signer = &[&job_seed[..]];

    ctx.accounts
        .job
        .close(ctx.accounts.creator.to_account_info())?;

    Ok(())
}
