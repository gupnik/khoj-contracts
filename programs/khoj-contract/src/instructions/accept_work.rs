use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Token, TokenAccount}
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct AcceptWorkIx {
   
}

#[derive(Accounts)]
#[instruction(ix: AcceptWorkIx)]
pub struct AcceptWorkCtx<'info> {
    #[account(
        mut,
        seeds = [ESCROW_PREFIX.as_bytes(), job.key().as_ref()],
        bump
    )]
    escrow: Account<'info, Escrow>,
    #[account(mut, constraint = 
        escrow_token_account.mint == job.price_mint.key() && 
        escrow_token_account.owner == escrow.key() @ ErrorCode::InvalidTokenAccount
    )]
    escrow_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = proposal.state == 2 && proposal.job == job.key() @ ErrorCode::InvalidProposal)]
    proposal: Account<'info, Proposal>,

    #[account(mut, constraint=job.state == 2 @ErrorCode::JobNotAvailable)]
    job: Account<'info, Job>,

    #[account(mut, constraint = job.creator == authority.key() @ErrorCode::Unauthorized)]
    authority: Signer<'info>,
    #[account(mut, constraint = 
        proposer_token_account.mint == job.price_mint.key() && 
        proposer_token_account.owner == proposal.proposer.key() @ ErrorCode::InvalidTokenAccount
    )]
    proposer_token_account: Box<Account<'info, TokenAccount>>,

    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<AcceptWorkCtx>, _: AcceptWorkIx) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let job = &mut ctx.accounts.job;
    let escrow = &mut ctx.accounts.escrow;

    job.state = 3;
    proposal.state = 3;

    let escrow_seed = &[ESCROW_PREFIX.as_bytes(), proposal.job.as_ref(), &[escrow.bump]];
    let escrow_signer = &[&escrow_seed[..]];

    let cpi_accounts = token::Transfer {
        from: ctx.accounts.escrow_token_account.to_account_info(),
        to: ctx.accounts.proposer_token_account.to_account_info(),
        authority: escrow.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts).with_signer(escrow_signer);
    token::transfer(cpi_context, proposal.price)?;

    Ok(())
}
