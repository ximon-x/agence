use near_sdk::{json_types::U64, near, AccountId, NearToken};
use std::fmt::Debug;

#[derive(PartialEq, Debug)]
#[near(serializers=[json, borsh])]
pub enum GigKind {
    FullTime,
    PartTime,
    Contract,
}

#[derive(PartialEq, Debug)]
#[near(serializers=[json, borsh])]
pub enum RejectionReason {
    Scam,
    Sham,
    Spam,
}

#[derive(PartialEq, Debug)]
#[near(serializers=[json, borsh])]
pub enum GigStatus {
    Pending,
    Active,
    Completed,
    Expired,
    Canceled,
    Rejected { reason: RejectionReason },
}

#[near(serializers=[json, borsh])]
pub struct Gig {
    pub id: U64,
    pub kind: GigKind,
    pub ace: Option<AccountId>,
    pub binding_amount: NearToken,
    pub agency: AccountId,
    pub status: GigStatus,
    pub min_hourly_rate: u8,
    pub max_hourly_rate: u8,
}
