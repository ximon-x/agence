use near_sdk::{
    env, log, near, require, Gas, NearToken, PanicOnDefault, Promise, PromiseError, PublicKey,
};

pub const MIN_FUNDING_AMOUNT: NearToken = NearToken::from_near(1);

const GOVERNANCE_CODE: &[u8] = include_bytes!("../out/governance.wasm");
const STAKING_CODE: &[u8] = include_bytes!("../out/staking.wasm");
const GIGS_CODE: &[u8] = include_bytes!("../out/gigs.wasm");

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {}

#[near]
impl Contract {
    pub fn deploy_contracts(&mut self, public_key: PublicKey) -> Promise {
        require!(
            env::attached_deposit() >= MIN_FUNDING_AMOUNT.saturating_mul(3),
            "Not enough attached deposit"
        );

        let governance_account =
            String::from("governance") + "." + env::current_account_id().as_str();
        let staking_account = String::from("staking") + "." + env::current_account_id().as_str();
        let gigs_account = String::from("gigs") + "." + env::current_account_id().as_str();

        let governance_promise = Promise::new(governance_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(GOVERNANCE_CODE.to_vec())
            .add_full_access_key(public_key.clone());

        let staking_promise = Promise::new(staking_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(STAKING_CODE.to_vec())
            .add_full_access_key(public_key.clone());

        let gigs_promise = Promise::new(gigs_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(GIGS_CODE.to_vec())
            .add_full_access_key(public_key);

        return governance_promise
            .and(staking_promise)
            .and(gigs_promise)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(5))
                    .deploy_contracts_callback(),
            );
    }

    #[private]
    pub fn deploy_contracts_callback(
        &mut self,
        #[callback_result] governance_result: Result<(), PromiseError>,
        #[callback_result] staking_result: Result<(), PromiseError>,
        #[callback_result] gigs_result: Result<(), PromiseError>,
    ) {
        if let Ok(_) = governance_result {
            log!("Governance deployed successfully");
        } else {
            log!("Governance deployment failed");
        }

        if let Ok(_) = staking_result {
            log!("Staking deployed successfully");
        } else {
            log!("Staking deployment failed");
        }

        if let Ok(_) = gigs_result {
            log!("Gigs deployed successfully");
        } else {
            log!("Gigs deployment failed");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
}
