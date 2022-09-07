pub mod errors;
pub mod instructions;
pub mod state;

use {anchor_lang::prelude::*, instructions::*};

declare_id!("Fv3kJNVK6LDxnGsat7zgRcaEGNGEucfQKi9VEf5LdAxj");

#[program]
pub mod khoj_contract {
    use super::*;

    pub fn init_platform(ctx: Context<InitPlatformCtx>, ix: InitPlatformIx) -> Result<()> {
        init_platform::handler(ctx, ix)
    }

    pub fn init_employer(ctx: Context<InitEmployerCtx>, ix: InitEmployerIx) -> Result<()> {
        init_employer::handler(ctx, ix)
    }

    pub fn update_employer(ctx: Context<UpdateEmployerCtx>, ix: UpdateEmployerIx) -> Result<()> {
        update_employer::handler(ctx, ix)
    }

    pub fn aggregate(ctx: Context<AggregateCtx>, ix: AggregateIx) -> Result<()> {
        aggregate::handler(ctx, ix)
    }

    pub fn init_talent(ctx: Context<InitTalentCtx>, ix: InitTalentIx) -> Result<()> {
        init_talent::handler(ctx, ix)
    }

    pub fn update_talent(ctx: Context<UpdateTalentCtx>, ix: UpdateTalentIx) -> Result<()> {
        update_talent::handler(ctx, ix)
    }

    pub fn stake(ctx: Context<StakeCtx>, ix: StakeIx) -> Result<()> {
        stake::handler(ctx, ix)
    }

    pub fn restake(ctx: Context<RestakeCtx>, ix: RestakeIx) -> Result<()> {
        restake::handler(ctx, ix)
    }

    pub fn unstake(ctx: Context<UnstakeCtx>, ix: UnstakeIx) -> Result<()> {
        unstake::handler(ctx, ix)
    }

    pub fn init_job(ctx: Context<InitJobCtx>, ix: InitJobIx) -> Result<()> {
        init_job::handler(ctx, ix)
    }

    pub fn close_job<'key, 'accounts, 'remaining, 'info>(
        ctx: Context<'key, 'accounts, 'remaining, 'info, CloseJobCtx<'info>>,
    ) -> Result<()> {
        close_job::handler(ctx)
    }

    pub fn init_proposal(ctx: Context<InitProposalCtx>, ix: InitProposalIx) -> Result<()> {
        init_proposal::handler(ctx, ix)
    }

    pub fn accept_proposal(ctx: Context<AcceptProposalCtx>, ix: AcceptProposalIx) -> Result<()> {
        accept_proposal::handler(ctx, ix)
    }

    pub fn submit_work(ctx: Context<SubmitWorkCtx>, ix: SubmitWorkIx) -> Result<()> {
        submit_work::handler(ctx, ix)
    }

    pub fn accept_work(ctx: Context<AcceptWorkCtx>, ix: AcceptWorkIx) -> Result<()> {
        accept_work::handler(ctx, ix)
    }
}
