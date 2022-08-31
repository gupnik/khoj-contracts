use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpdateEmployerIx {
    pub name: Option<String>,
    pub pfp: Option<Pubkey>,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
}

#[derive(Accounts)]
pub struct UpdateEmployerCtx<'info> {
    #[account(mut, constraint = employer.wallet == payer.key() @ErrorCode::Unauthorized)]
    employer: Account<'info, Employer>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<UpdateEmployerCtx>, ix: UpdateEmployerIx) -> Result<()> {
    let employer = &mut ctx.accounts.employer;

    if let Some(name) = ix.name {
        employer.name = name;
    }

    if let Some(_) = ix.pfp {
        employer.pfp = ix.pfp;
    }

    if let Some(_) = ix.discord_handle {
        employer.discord_handle = ix.discord_handle;
    }

    if let Some(_) = ix.twitter_handle {
        employer.twitter_handle = ix.twitter_handle;
    }

    Ok(())
}
