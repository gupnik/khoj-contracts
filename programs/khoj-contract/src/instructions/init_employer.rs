use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitEmployerIx {
    pub name: String,
    pub uri: String,
    pub pfp: Option<Pubkey>,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
}

#[derive(Accounts)]
pub struct InitEmployerCtx<'info> {
    #[account(
        init,
        payer = payer,
        space = Employer::size(),
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
    employer.uri = ix.uri;
    employer.pfp = ix.pfp;

    employer.created_job_count = 0;
    employer.stake_amount = 0;
    employer.is_aggregator = false;

    if let Some(_) = ix.discord_handle {
        employer.discord_handle = ix.discord_handle;
    }

    if let Some(_) = ix.twitter_handle {
        employer.twitter_handle = ix.twitter_handle;
    }

    Ok(())
}
