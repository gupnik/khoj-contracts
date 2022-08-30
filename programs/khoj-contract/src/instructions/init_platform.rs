use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{Mint, TokenAccount}
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitPlatformIx {
    
}

#[derive(Accounts)]
pub struct InitPlatformCtx<'info> {
    #[account(
        init,
        payer = payer,
        space = PLATFORM_SIZE,
        seeds = [PLATFORM_PREFIX.as_bytes(), payer.key().as_ref()],
        bump
    )]
    platform: Account<'info, Platform>,

    #[account(mut)]
    mint: Box<Account<'info, Mint>>,

    #[account(mut, constraint = payer_mint_token_account.mint == mint.key() && payer_mint_token_account.owner == payer.key() @ ErrorCode::InvalidTokenAccount)]
    payer_mint_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = assert_owner(&payer.key()) @ErrorCode::Unauthorized)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitPlatformCtx>, _: InitPlatformIx) -> Result<()> {
    let platform = &mut ctx.accounts.platform;
    platform.bump = *ctx.bumps.get("platform").unwrap();
    
    platform.mint = ctx.accounts.mint.key();
    platform.mint_token_account = ctx.accounts.payer_mint_token_account.key();

    Ok(())
}
