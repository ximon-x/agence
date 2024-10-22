use near_sdk::{near, NearToken};

pub enum SlashKind {
    Scam,
    Sham,
    Spam,
}

#[near(serializers=[json, borsh])]
pub struct Stake {
    pub locked_stake: NearToken,
    pub available_stake: NearToken,
    pub total_stake: NearToken,
}
