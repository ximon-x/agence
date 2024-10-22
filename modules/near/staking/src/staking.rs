use near_sdk::{env, log, near, require, AccountId, Gas, NearToken, Promise, PromiseError};

use crate::{external::governance, types::Stake, Contract, ContractExt};

pub const MIN_STAKE: NearToken = NearToken::from_millinear(100);

#[near]
impl Contract {
    #[private]
    pub fn register(&mut self, user_id: AccountId, amount: NearToken) -> Promise {
        let promise = governance::ext(self.governance_account.clone())
            .with_static_gas(Gas::from_tgas(5))
            .create_member(user_id, amount);

        return promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(10))
                .register_callback(),
        );
    }

    #[private]
    pub fn register_callback(
        &mut self,
        #[callback_result] call_result: Result<(AccountId, NearToken), PromiseError>,
    ) {
        match call_result {
            Ok((user_id, amount)) => {
                self.stakes.insert(
                    user_id.clone(),
                    Stake {
                        locked_stake: NearToken::from_millinear(0),
                        available_stake: amount,
                        total_stake: amount,
                    },
                );

                log!("Registered {} in DAO.", user_id);
            }
            Err(_) => {
                // ! Figure out how to return user's fund.
                log!("Failed to register user in DAO.");
            }
        }
    }

    #[payable]
    pub fn stake(&mut self, user_id: AccountId) {
        require!(
            env::attached_deposit() >= MIN_STAKE,
            "Minimum stake amount is 100 millinear."
        );

        match self.stakes.get(&user_id) {
            Some(stake) => {
                let locked_stake = stake.locked_stake;
                let total_stake = stake.total_stake.saturating_add(env::attached_deposit());
                let available_stake = total_stake.saturating_sub(locked_stake);

                self.stakes.insert(
                    user_id,
                    Stake {
                        total_stake,
                        locked_stake,
                        available_stake,
                    },
                );
            }
            None => {
                self.register(user_id, env::attached_deposit());
            }
        };
    }

    pub fn unstake(&mut self, user_id: AccountId, amount: NearToken) {
        require!(self.stakes.get(&user_id).is_some(), "User has no stake.");

        let stake = self.stakes.get(&user_id).unwrap();

        require!(
            stake.available_stake >= amount,
            "User does not have enough available stake."
        );

        Promise::new(user_id.clone()).transfer(amount);

        let locked_stake = stake.locked_stake;
        let total_stake = stake.total_stake.saturating_sub(amount);
        let available_stake = total_stake.saturating_sub(locked_stake);

        if available_stake.is_zero() {
            self.stakes.remove(&user_id);
        } else {
            self.stakes.insert(
                user_id,
                Stake {
                    locked_stake,
                    available_stake,
                    total_stake,
                },
            );
        }
    }

    pub fn lock_stake(&mut self, user_id: AccountId, amount: NearToken) {
        self.only_governance_or_gigs();
        require!(self.stakes.get(&user_id).is_some(), "User has no stake.");

        let stake = self.stakes.get(&user_id).unwrap();

        let total_stake = stake.total_stake;
        let locked_stake = stake.locked_stake.saturating_add(amount);
        let available_stake = total_stake.saturating_sub(locked_stake);

        self.stakes.insert(
            user_id,
            Stake {
                locked_stake,
                available_stake,
                total_stake,
            },
        );
    }

    pub fn unlock_stake(&mut self, user_id: AccountId, amount: NearToken) {
        self.only_governance_or_gigs();
        require!(self.stakes.get(&user_id).is_some(), "User has no stake.");

        let stake = self.stakes.get(&user_id).unwrap();

        let total_stake = stake.total_stake;
        let locked_stake = stake.locked_stake.saturating_sub(amount);
        let available_stake = total_stake.saturating_sub(locked_stake);

        self.stakes.insert(
            user_id,
            Stake {
                locked_stake,
                available_stake,
                total_stake,
            },
        );
    }

    pub fn get_stake(&self, user_id: AccountId) -> Option<&Stake> {
        self.stakes.get(&user_id)
    }
}
