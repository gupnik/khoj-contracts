use anchor_lang::prelude::*;
use std::str::FromStr;

pub fn assert_owner(pubkey: &Pubkey) -> bool {
    pubkey.to_string()
        == Pubkey::from_str("E1LMZ2rzvqh1dhDzUTDTn5Snk8p4wt9fc5rPA7M6ev2V")
            .unwrap()
            .to_string()
}

pub const PLATFORM_PREFIX: &str = "platform";
pub const PLATFORM_SIZE: usize = 8 + std::mem::size_of::<Platform>() + 8;

pub const AGGREGATOR_PREFIX: &str = "aggregator";

pub const EMPLOYER_PREFIX: &str = "employer";

pub const TALENT_PREFIX: &str = "talent";

pub const JOB_PREFIX: &str = "job";

pub const PROPOSAL_PREFIX: &str = "proposal";

pub const ESCROW_PREFIX: &str = "escrow";
pub const ESCROW_SIZE: usize = 8 + std::mem::size_of::<Escrow>() + 8;

pub const STAKE_PREFIX: &str = "stake";
pub const STAKE_SIZE: usize = 8 + std::mem::size_of::<Stake>() + 8;

pub const MAX_SKILLS: usize = 5;
pub const MAX_SKILL_LENGTH: usize = 20;

pub const MAX_CATEGORY_LENGTH: usize = 20;
pub const MAX_TITLE_LENGTH: usize = 30;
pub const MAX_URI_LENGTH: usize = 40;

#[account]
pub struct Platform {
    pub bump: u8,
    pub mint: Pubkey,
    pub mint_token_account: Pubkey,
}

#[account]
pub struct AggregatorLink {
    pub bump: u8,
    pub aggregator: Pubkey,
    pub employer: Pubkey,
}

impl AggregatorLink {
    pub fn size() -> usize {
        8 + 1 + 32 + 32 + 8
    }
}

#[account]
pub struct Employer {
    pub bump: u8,
    pub wallet: Pubkey,
    pub pfp: Option<Pubkey>,
    pub name: String,
    pub uri: String,
    pub stake_amount: u64,
    pub created_job_count: u64,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
    pub is_aggregator: bool,
}

impl Employer {
    pub fn size() -> usize {
        8 + 1 + 32 + 32 + 32 + MAX_URI_LENGTH + 8 + 8 + 32 + 15 + 1 + 8
    }
}

#[account]
pub struct Talent {
    pub bump: u8,
    pub wallet: Pubkey,
    pub pfp: Option<Pubkey>,
    pub name: String,
    pub uri: String,
    pub stake_amount: u64,
    pub submitted_proposal_count: u64,
    pub skills: Vec<String>,
    pub discord_handle: Option<String>,
    pub twitter_handle: Option<String>,
}

impl Talent {
    pub fn size() -> usize {
        8 + 1 + 32 + 32 + 32 + MAX_URI_LENGTH + 8 + 8 + MAX_SKILLS * MAX_SKILL_LENGTH + 32 + 15 + 8
    }
}

#[account]
pub struct Job {
    pub bump: u8,
    pub creator: Pubkey,
    pub category: String,
    pub job_type: u8,
    pub state: u8,
    pub title: String,
    pub uri: String,
    pub price: u64,
    pub price_mint: Pubkey,
    pub proposal_count: u64,
    pub accepted_proposal: Pubkey,
    pub created_at: i64,
}

impl Job {
    pub fn size() -> usize {
        8 + 1
            + 32
            + MAX_CATEGORY_LENGTH
            + 1
            + 1
            + MAX_TITLE_LENGTH
            + MAX_URI_LENGTH
            + 8
            + 32
            + 8
            + 32
            + 8
            + 8
    }
}

#[account]
pub struct Proposal {
    pub bump: u8,
    pub proposer: Pubkey,
    pub job: Pubkey,
    pub state: u8,
    pub uri: String,
    pub price: u64,
    pub created_at: i64,
}

impl Proposal {
    pub fn size() -> usize {
        8 + 1 + 32 + 32 + 1 + MAX_URI_LENGTH + 8 + 8 + 8
    }
}

#[account]
pub struct Escrow {
    pub bump: u8,
}

#[account]
pub struct Stake {
    pub bump: u8,
}
