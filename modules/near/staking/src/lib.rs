mod external;
mod slashing;
mod staking;
pub mod types;

use near_sdk::{
    env, near, require, store::LookupMap, AccountId, BorshStorageKey, NearToken, PanicOnDefault,
};
use types::Stake;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Stakes,
}

pub const GIG_CREATION_FEE: NearToken = NearToken::from_millinear(500);

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    governance_account: AccountId,
    gigs_account: AccountId,
    stakes: LookupMap<AccountId, Stake>,
}

#[near]
impl Contract {
    #[init]
    #[private]
    pub fn init(governance_account: AccountId, gigs_account: AccountId) -> Self {
        Self {
            governance_account,
            gigs_account,
            stakes: LookupMap::new(Prefix::Stakes),
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

    #[test]
    fn init() {
        let contract = Contract::init("governor".parse().unwrap(), "gigs".parse().unwrap());
        assert_eq!(contract.governance_account, "governor");
        assert_eq!(contract.gigs_account, "gigs");
    }
}
