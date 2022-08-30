use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Token, TokenAccount},
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UnstakeIx {
    pub amount: u64,
}

#[derive(Accounts)]
pub struct UnstakeCtx<'info> {
    #[account(mut)]
    platform: Account<'info, Platform>,

    #[account(mut, constraint = talent.wallet == payer.key() @ErrorCode::Unauthorized)]
    talent: Account<'info, Talent>,

    #[account(mut, seeds = [ESCROW_PREFIX.as_bytes(), payer.key().as_ref()], bump)]
    stake: Account<'info, Stake>,

    #[account(mut, constraint = payer_mint_token_account.mint == platform.mint && payer_mint_token_account.owner == talent.key() @ ErrorCode::InvalidTokenAccount)]
    payer_mint_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = stake_mint_token_account.mint == platform.mint @ ErrorCode::InvalidTokenAccount)]
    stake_mint_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    payer: Signer<'info>,
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<UnstakeCtx>, ix: UnstakeIx) -> Result<()> {
    let talent = &mut ctx.accounts.talent;
    let stake = &mut ctx.accounts.stake;

    let stake_seed = [
        STAKE_PREFIX.as_bytes(),
        talent.wallet.as_ref(),
        &[stake.bump],
    ];
    let stake_signer = &[&stake_seed[..]];

    let cpi_accounts = token::Transfer {
        from: ctx.accounts.stake_mint_token_account.to_account_info(),
        to: ctx.accounts.payer_mint_token_account.to_account_info(),
        authority: ctx.accounts.stake.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts).with_signer(stake_signer);
    token::transfer(cpi_context, ix.amount)?;

    talent.stake_amount -= ix.amount;

    Ok(())
}
