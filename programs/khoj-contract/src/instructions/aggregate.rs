use {
    crate::{errors::ErrorCode, state::*},
    anchor_lang::prelude::*,
};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct AggregateIx {}

#[derive(Accounts)]
pub struct AggregateCtx<'info> {
    #[account(
        init,
        payer = payer,
        space = AggregatorLink::size(),
        seeds = [AGGREGATOR_PREFIX.as_bytes(), aggregator.key().as_ref(), employer.key().as_ref()],
        bump
    )]
    aggregator_link: Account<'info, AggregatorLink>,

    #[account(mut, constraint = employer.wallet == payer.key() @ErrorCode::Unauthorized)]
    aggregator: Account<'info, Employer>,

    #[account(mut)]
    employer: Account<'info, Employer>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<AggregateCtx>, _: AggregateIx) -> Result<()> {
    let aggregator_link = &mut ctx.accounts.aggregator_link;
    let aggregator = &mut ctx.accounts.aggregator;

    aggregator_link.bump = *ctx.bumps.get("aggregator_link").unwrap();
    aggregator_link.aggregator = aggregator.key();
    aggregator_link.employer = ctx.accounts.employer.key();

    aggregator.is_aggregator = true;

    Ok(())
}
