use near_sdk::{ext_contract, AccountId, NearToken};

#[allow(dead_code)]
#[ext_contract(staking)]
pub trait Staking {
    fn lock_stake(&self, user_id: AccountId, amount: NearToken);
    fn unlock_stake(&self, user_id: AccountId, amount: NearToken);
}
