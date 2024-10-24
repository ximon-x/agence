use near_sdk::{env, log, near, require, AccountId, NearToken, Promise};

use crate::{Contract, ContractExt};

pub const MIN_STAKE: NearToken = NearToken::from_millinear(100);

#[near]
impl Contract {
    #[payable]
    pub fn stake(&mut self) {
        require!(
            env::attached_deposit() >= MIN_STAKE,
            "Minimum stake amount is 100 millinear."
        );

        match self.users.get_mut(&env::predecessor_account_id()) {
            Some(user) => {
                user.total_stake = user.total_stake.saturating_add(env::attached_deposit());
                user.available_stake = user.total_stake.saturating_sub(user.locked_stake);
            }

            None => {
                log!("User {} does not exist", env::predecessor_account_id());
                Promise::new(env::predecessor_account_id()).transfer(env::attached_deposit());
            }
        };
    }

    pub fn unstake(&mut self, amount: NearToken, benefiary: Option<AccountId>) {
        match self.users.get_mut(&env::predecessor_account_id()) {
            Some(user) => {
                require!(
                    user.available_stake >= amount,
                    "User does not have enough available stake."
                );

                Promise::new(benefiary.unwrap_or(env::predecessor_account_id())).transfer(amount);

                user.total_stake = user.total_stake.saturating_sub(amount);

                if user.total_stake.is_zero() {
                    self.users.remove(&env::predecessor_account_id());
                } else {
                    user.available_stake = user.total_stake.saturating_sub(user.locked_stake);
                }
            }

            None => {
                log!("User {} does not exist", env::predecessor_account_id());
            }
        };
    }

    pub fn lock_stake(&mut self, user_id: AccountId, amount: NearToken) {
        self.only_governance_or_gigs();

        match self.users.get_mut(&user_id) {
            Some(user) => {
                require!(
                    user.available_stake >= amount,
                    "User does not have enough available stake."
                );

                user.locked_stake = user.locked_stake.saturating_add(amount);
                user.available_stake = user.total_stake.saturating_sub(user.locked_stake);
            }

            None => {
                log!("User {} does not exist", user_id);
            }
        }
    }

    pub fn unlock_stake(&mut self, user_id: AccountId, amount: NearToken) {
        self.only_governance_or_gigs();

        match self.users.get_mut(&user_id) {
            Some(user) => {
                require!(
                    user.locked_stake >= amount,
                    "User does not have enough locked stake."
                );

                user.locked_stake = user.locked_stake.saturating_sub(amount);
                user.available_stake = user.total_stake.saturating_sub(user.locked_stake);
            }

            None => {
                log!("User {} does not exist", user_id);
            }
        };
    }

    pub fn slash_stake(&mut self, user_id: AccountId, amount: NearToken) {
        self.only_governance_or_gigs();

        match self.users.get_mut(&user_id) {
            Some(user) => {
                require!(
                    user.locked_stake >= amount,
                    "User does not have enough locked stake.",
                );

                user.locked_stake = user.locked_stake.saturating_sub(amount);
                user.total_stake = user.total_stake.saturating_sub(amount);

                if user.total_stake.is_zero() {
                    self.users.remove(&user_id);
                } else {
                    user.available_stake = user.total_stake.saturating_sub(user.locked_stake);
                }
            }

            None => {
                log!("User {} does not exist", user_id);
            }
        }
    }
}
