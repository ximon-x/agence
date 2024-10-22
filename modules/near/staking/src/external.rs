use near_sdk::{ext_contract, AccountId, NearToken};

#[allow(dead_code)]
#[ext_contract(governance)]
pub trait Governance {
    fn create_member(&mut self, user_id: AccountId, amount: NearToken) -> (AccountId, NearToken);
}
