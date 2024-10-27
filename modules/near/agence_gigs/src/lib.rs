mod external;
mod gig;
pub mod types;

use near_sdk::{
    env, json_types::U64, near, require, store::IterableMap, AccountId, BorshStorageKey,
    PanicOnDefault,
};
use types::Gig;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Gigs,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    governance_account: AccountId,
    staking_account: AccountId,
    gigs: IterableMap<U64, Gig>,
    next_gig_id: U64,
}

#[near]
impl Contract {
    #[init]
    #[private]
    pub fn init(governance_account: AccountId, staking_account: AccountId) -> Self {
        Self {
            governance_account,
            staking_account,
            next_gig_id: U64(1),
            gigs: IterableMap::new(Prefix::Gigs),
        }
    }

    fn only_governance_or_staking(&self) {
        require!(
            env::predecessor_account_id() == self.governance_account
                || env::predecessor_account_id() == self.staking_account,
            "Only the governance or the staking contract can call this method."
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn init() {
        let contract = Contract::init("governor".parse().unwrap(), "staking".parse().unwrap());
        assert_eq!(contract.governance_account, "governor");
        assert_eq!(contract.staking_account, "staking");
    }
}
