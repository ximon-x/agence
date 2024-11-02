use near_sdk::{env, log, near, require, AccountId, NearToken, Promise};

use crate::{
    types::{Role, User},
    Contract, ContractExt,
};

pub const MIN_ACE_REGISTRATION_FEE: NearToken = NearToken::from_millinear(100);
pub const MIN_AGENCY_REGISTRATION_FEE: NearToken = NearToken::from_millinear(500);
pub const MIN_ADMIN_REGISTRATION_FEE: NearToken = NearToken::from_near(1);

#[near]
impl Contract {
    #[payable]
    pub fn create_user(&mut self, role: Role) {
        let user_id = env::predecessor_account_id();

        let fee = match role {
            Role::Ace => MIN_ACE_REGISTRATION_FEE,
            Role::Admin => MIN_ADMIN_REGISTRATION_FEE,
            Role::Agency => MIN_AGENCY_REGISTRATION_FEE,
        };

        require!(
            env::attached_deposit() >= fee,
            format!(
                "Minimum registration fee for role {:?} is {} millinear.",
                role, fee
            )
        );

        match self.users.get(&user_id) {
            Some(_) => {
                log!("User {} already exists", user_id);
                Promise::new(user_id).transfer(env::attached_deposit());
            }

            None => {
                let locked_stake = NearToken::from_near(0);
                let total_stake = env::attached_deposit();
                let available_stake = total_stake.saturating_sub(locked_stake);

                self.users.insert(
                    user_id,
                    User {
                        role,
                        locked_stake,
                        available_stake,
                        total_stake,
                    },
                );
            }
        };
    }

    pub fn delete_user(&mut self, beneficiary: Option<AccountId>) {
        match self.users.get(&env::predecessor_account_id()) {
            Some(user) => {
                Promise::new(beneficiary.unwrap_or(env::predecessor_account_id()))
                    .transfer(user.total_stake);

                self.users.remove(&env::predecessor_account_id());
            }

            None => {
                log!("User {} does not exist", env::predecessor_account_id());
            }
        };
    }

    pub fn get_user(&self, user_id: AccountId) -> Option<&User> {
        self.users.get(&user_id)
    }
}
