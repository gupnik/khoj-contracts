use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Token, TokenAccount},
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct RestakeIx {
    pub amount: u64
}

#[derive(Accounts)]
pub struct RestakeCtx<'info> {
    #[account(mut)]
    platform: Account<'info, Platform>,

    #[account(
        mut,
        seeds = [STAKE_PREFIX.as_bytes(), payer.key().as_ref()],
        bump
    )]
    stake: Account<'info, Stake>,

    #[account(mut, constraint = 
        stake_mint_token_account.mint == platform.mint && 
        stake_mint_token_account.owner == stake.key() @ ErrorCode::InvalidTokenAccount
    )]
    stake_mint_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = talent.wallet == payer.key() @ErrorCode::Unauthorized)]
    talent: Account<'info, Talent>,

    #[account(mut, constraint = payer_mint_token_account.mint == platform.mint && payer_mint_token_account.owner == payer.key() @ ErrorCode::InvalidTokenAccount)]
    payer_mint_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    payer: Signer<'info>,
    
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<RestakeCtx>, ix: RestakeIx) -> Result<()> {
    let talent = &mut ctx.accounts.talent;

    let cpi_accounts = token::Transfer {
        from: ctx.accounts.payer_mint_token_account.to_account_info(),
        to: ctx.accounts.stake_mint_token_account.to_account_info(),
        authority: ctx.accounts.payer.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_context, ix.amount)?;

    talent.stake_amount += ix.amount;

    Ok(())
}
