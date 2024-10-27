mod external;
mod governance;
mod proposals;
pub mod types;

use near_sdk::{
    env, json_types::U64, near, require, store::LookupMap, AccountId, BorshStorageKey,
    PanicOnDefault,
};

use types::Proposal;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Proposals,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    staking_account: AccountId,
    gigs_account: AccountId,
    proposals: LookupMap<U64, Proposal>,
    next_proposal_id: U64,
}

#[near]
impl Contract {
    #[init]
    pub fn init(staking_account: AccountId, gigs_account: AccountId) -> Self {
        Self {
            staking_account,
            gigs_account,
            next_proposal_id: U64(1),
            proposals: LookupMap::new(Prefix::Proposals),
        }
    }

    fn only_staking_or_gigs(&self) {
        require!(
            env::predecessor_account_id() == self.staking_account
                || env::predecessor_account_id() == self.gigs_account,
            "Only staking or gigs account can call this method"
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const STAKING: &str = "staking";
    const GIGS: &str = "gigs";

    #[test]
    fn init() {
        let contract = Contract::init(STAKING.parse().unwrap(), GIGS.parse().unwrap());

        assert_eq!(contract.staking_account, STAKING);
        assert_eq!(contract.gigs_account, GIGS);
    }
}
