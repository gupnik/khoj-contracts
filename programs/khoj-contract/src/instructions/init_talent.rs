use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitTalentIx {
    pub name: String,
    pub pfp: Option<Pubkey>,
    pub skills: Vec<String>,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
}

#[derive(Accounts)]
#[instruction(ix: InitTalentIx)]
pub struct InitTalentCtx<'info> {
    #[account(
        init,
        payer = payer,
        space = Talent::size(),
        seeds = [TALENT_PREFIX.as_bytes(), payer.key().as_ref()],
        bump
    )]
    talent: Account<'info, Talent>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitTalentCtx>, ix: InitTalentIx) -> Result<()> {
    let talent = &mut ctx.accounts.talent;
    talent.bump = *ctx.bumps.get("talent").unwrap();

    talent.wallet = ctx.accounts.payer.key();
    talent.name = ix.name;
    talent.pfp = ix.pfp;
    talent.skills = ix.skills;

    talent.stake_amount = 0;

    if let Some(_) = ix.discord_handle {
        talent.discord_handle = ix.discord_handle;
    }

    if let Some(_) = ix.twitter_handle {
        talent.twitter_handle = ix.twitter_handle;
    }

    Ok(())
}
