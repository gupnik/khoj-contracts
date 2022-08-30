use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Job Not Available")]
    JobNotAvailable,
    #[msg("Proposal not for this job")]
    ProposalNotForThisJob,
    #[msg("Invalid Price Mint")]
    InvalidPriceMint,
    #[msg("Invalid Token Account")]
    InvalidTokenAccount,
    #[msg("Invalid Proposal")]
    InvalidProposal
}