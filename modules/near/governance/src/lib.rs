use near_sdk::{near, store::LookupMap, AccountId, BorshStorageKey, PanicOnDefault};

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Members,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    staking_account: AccountId,
    gigs_account: AccountId,
    members: LookupMap<AccountId, ()>,
}

// Implement the contract structure
#[near]
impl Contract {
    #[init]
    pub fn init(staking_account: AccountId, gigs_account: AccountId) -> Self {
        Self {
            staking_account,
            gigs_account,
            members: LookupMap::new(Prefix::Members),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
}
