use near_sdk::{near, NearToken};

use crate::{Contract, ContractExt};

#[near]
impl Contract {
    #[payable]
    pub fn create_proposal(&mut self, name: String, description: String) {}
}
