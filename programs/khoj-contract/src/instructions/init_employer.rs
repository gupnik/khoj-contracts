use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitEmployerIx {
    pub name: String,
    pub pfp: Option<Pubkey>,
}

#[derive(Accounts)]
pub struct InitEmployerCtx<'info> {
    #[account(
        init,
        payer = payer,
        space = EMPLOYER_SIZE,
        seeds = [EMPLOYER_PREFIX.as_bytes(), payer.key().as_ref()],
        bump
    )]
    employer: Account<'info, Employer>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitEmployerCtx>, ix: InitEmployerIx) -> Result<()> {
    let employer = &mut ctx.accounts.employer;
    employer.bump = *ctx.bumps.get("employer").unwrap();

    employer.wallet = ctx.accounts.payer.key();
    employer.name = ix.name;
    employer.pfp = ix.pfp;

    employer.created_job_count = 0;
    employer.stake_amount = 0;

    Ok(())
}
