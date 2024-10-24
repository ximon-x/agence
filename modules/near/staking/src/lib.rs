mod external;
mod staking;
pub mod types;
mod user;

use near_sdk::{env, near, require, store::LookupMap, AccountId, BorshStorageKey, PanicOnDefault};
use types::User;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    User,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    governance_account: AccountId,
    gigs_account: AccountId,
    users: LookupMap<AccountId, User>,
}

#[near]
impl Contract {
    #[init]
    #[private]
    pub fn init(governance_account: AccountId, gigs_account: AccountId) -> Self {
        Self {
            governance_account,
            gigs_account,
            users: LookupMap::new(Prefix::User),
        }
    }

    fn only_governance_or_gigs(&self) {
        require!(
            env::predecessor_account_id() == self.governance_account
                || env::predecessor_account_id() == self.gigs_account,
            "Only the governance or the gigs contract can call this method."
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const GOVERNANCE: &str = "governance";
    const GIGS: &str = "gigs";

    #[test]
    fn init() {
        let contract = Contract::init(GOVERNANCE.parse().unwrap(), GIGS.parse().unwrap());

        assert_eq!(contract.governance_account, GOVERNANCE);
        assert_eq!(contract.gigs_account, GIGS);
    }
}
