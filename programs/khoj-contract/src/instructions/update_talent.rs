use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpdateTalentIx {
    pub name: Option<String>,
    pub pfp: Option<Pubkey>,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
}

#[derive(Accounts)]
pub struct UpdateTalentCtx<'info> {
    #[account(mut, constraint = talent.wallet == payer.key() @ErrorCode::Unauthorized)]
    talent: Account<'info, Talent>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<UpdateTalentCtx>, ix: UpdateTalentIx) -> Result<()> {
    let talent = &mut ctx.accounts.talent;

    if let Some(name) = ix.name {
        talent.name = name;
    }

    if let Some(_) = ix.pfp {
        talent.pfp = ix.pfp;
    }

    if let Some(_) = ix.discord_handle {
        talent.discord_handle = ix.discord_handle;
    }

    if let Some(_) = ix.twitter_handle {
        talent.twitter_handle = ix.twitter_handle;
    }

    Ok(())
}
