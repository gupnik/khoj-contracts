use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Token, TokenAccount}
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct AcceptProposalIx {
   
}

#[derive(Accounts)]
#[instruction(ix: AcceptProposalIx)]
pub struct AcceptProposalCtx<'info> {
    #[account(
        init,
        payer = authority,
        space = ESCROW_SIZE,
        seeds = [ESCROW_PREFIX.as_bytes(), job.key().as_ref()],
        bump
    )]
    escrow: Account<'info, Escrow>,
    #[account(mut, constraint = 
        escrow_token_account.mint == job.price_mint.key() && 
        escrow_token_account.owner == escrow.key() @ ErrorCode::InvalidTokenAccount
    )]
    escrow_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = proposal.job == job.key() @ ErrorCode::ProposalNotForThisJob)]
    proposal: Account<'info, Proposal>,

    #[account(mut, constraint=job.state == 0 @ErrorCode::JobNotAvailable)]
    job: Account<'info, Job>,

    #[account(mut, constraint = job.creator == authority.key() @ErrorCode::Unauthorized)]
    authority: Signer<'info>,
    #[account(mut, constraint = 
        authority_token_account.mint == job.price_mint.key() && 
        authority_token_account.owner == authority.key() @ ErrorCode::InvalidTokenAccount
    )]
    authority_token_account: Box<Account<'info, TokenAccount>>,

    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<AcceptProposalCtx>, _: AcceptProposalIx) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let job = &mut ctx.accounts.job;
    let escrow = &mut ctx.accounts.escrow;
    escrow.bump = *ctx.bumps.get("escrow").unwrap();

    job.state = 1;
    job.accepted_proposal = proposal.key();
    proposal.state = 1;

    let cpi_accounts = token::Transfer {
        from: ctx.accounts.authority_token_account.to_account_info(),
        to: ctx.accounts.escrow_token_account.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_context, proposal.price)?;

    Ok(())
}
