use near_sdk::{
    env::{self},
    json_types::U64,
    log, near, require, AccountId, Gas, NearToken, Promise, PromiseError,
};

use crate::{
    external::staking,
    types::{GigKind, GigStatus, RejectionReason},
    Contract, ContractExt, Gig,
};

#[near]
impl Contract {
    pub fn create_gig(&self, kind: GigKind, binding_amount: NearToken) -> Promise {
        let lock_stake_promise = staking::ext(self.staking_account.clone())
            .with_static_gas(Gas::from_tgas(5))
            .lock_stake(env::predecessor_account_id(), binding_amount);

        return lock_stake_promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(5))
                .create_gig_callback(kind, env::predecessor_account_id(), binding_amount),
        );
    }

    #[private]
    pub fn create_gig_callback(
        &mut self,
        kind: GigKind,
        agency: AccountId,
        binding_amount: NearToken,
        #[callback_result] lock_stake_result: Result<(), PromiseError>,
    ) {
        match lock_stake_result {
            Ok(_) => {
                let gig = Gig {
                    kind,
                    agency,
                    ace: None,
                    binding_amount,
                    status: GigStatus::Pending,
                };

                self.gigs.insert(self.next_gig_id, gig);

                let curr_id: u64 = self.next_gig_id.into();
                self.next_gig_id = U64::from(curr_id + 1);
            }

            Err(error) => {
                log!("Error: {:?}", error);
            }
        }
    }

    pub fn start_gig(&mut self, gig_id: U64, selected_ace: AccountId) -> Promise {
        self.only_governance_or_staking();

        let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");

        let lock_stake_promise = staking::ext(self.staking_account.clone())
            .with_static_gas(Gas::from_tgas(5))
            .lock_stake(selected_ace.clone(), gig.binding_amount);

        return lock_stake_promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(5))
                .start_gig_callback(gig_id, selected_ace),
        );
    }

    #[private]
    pub fn start_gig_callback(
        &mut self,
        gig_id: U64,
        selected_ace: AccountId,
        #[callback_result] lock_stake_result: Result<(), PromiseError>,
    ) {
        self.only_governance_or_staking();

        match lock_stake_result {
            Ok(_) => {
                let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");

                gig.ace = Some(selected_ace);
                gig.status = GigStatus::Active;
            }

            Err(error) => {
                log!("Error: {:?}", error);
            }
        }
    }

    pub fn complete_gig(&mut self, gig_id: U64) -> Promise {
        self.only_governance_or_staking();

        let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");

        require!(gig.status == GigStatus::Active, "Gig is not active");
        require!(gig.ace.is_some(), "Gig has no ace");

        let unlock_agency_stake_promise = staking::ext(self.staking_account.clone())
            .with_static_gas(Gas::from_tgas(5))
            .unlock_stake(gig.agency.clone(), gig.binding_amount);

        let unlock_ace_stake_promise = staking::ext(self.staking_account.clone())
            .with_static_gas(Gas::from_tgas(5))
            .unlock_stake(gig.ace.clone().unwrap(), gig.binding_amount);

        return unlock_ace_stake_promise
            .and(unlock_agency_stake_promise)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(5))
                    .complete_gig_callback(gig_id),
            );
    }

    #[private]
    pub fn complete_gig_callback(
        &mut self,
        gig_id: U64,
        #[callback_result] unlock_ace_stake_result: Result<(), PromiseError>,
        #[callback_result] unlock_agency_stake_result: Result<(), PromiseError>,
    ) {
        if unlock_ace_stake_result.is_err() {
            log!("Error: {:?}", unlock_ace_stake_result);
            return;
        };

        if unlock_agency_stake_result.is_err() {
            log!("Error: {:?}", unlock_agency_stake_result);
            return;
        };

        let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");
        gig.status = GigStatus::Completed;
    }

    pub fn cancel_gig(&mut self, gig_id: U64) {
        self.only_governance_or_staking();

        let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");
        gig.status = GigStatus::Cancelled;
    }

    pub fn flag_gig(&mut self, gig_id: U64, reason: RejectionReason) {
        self.only_governance_or_staking();

        let gig = self.gigs.get_mut(&gig_id).expect("Gig does not exist");
        gig.status = GigStatus::Rejected { reason };
    }

    pub fn get_gigs(&self, user: AccountId) -> Vec<(&U64, &Gig)> {
        self.gigs
            .iter()
            .filter(|(_, gig)| gig.ace == Some(user.clone()) || gig.agency == user)
            .collect()
    }

    pub fn get_gig(&self, gig_id: U64) -> Option<&Gig> {
        self.gigs.get(&gig_id)
    }
}

#[cfg(test)]
mod tests {
    use near_sdk::{test_utils::VMContextBuilder, testing_env};

    use super::*;

    const GOVERNOR: &str = "governor";
    const STAKING: &str = "staking";

    const AGENCY: &str = "agency";
    const ACE: &str = "ace";

    fn set_context(predecessor: &str) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());

        testing_env!(builder.build());
    }
}
