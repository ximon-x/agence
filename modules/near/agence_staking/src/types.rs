use near_sdk::{near, NearToken};

#[near(serializers=[json, borsh])]
#[derive(Debug)]
pub enum Role {
    Ace,
    Admin,
    Agency,
}

#[near(serializers=[json, borsh])]
pub struct User {
    pub role: Role,
    pub locked_stake: NearToken,
    pub available_stake: NearToken,
    pub total_stake: NearToken,
}
