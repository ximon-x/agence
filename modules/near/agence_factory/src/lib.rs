use near_sdk::{env, log, near, require, Gas, NearToken, Promise, PromiseError, PublicKey};

pub const MIN_FUNDING_AMOUNT: NearToken = NearToken::from_near(2);

const GOVERNANCE_CODE: &[u8] = include_bytes!("../out/governance_contract.wasm");
const STAKING_CODE: &[u8] = include_bytes!("../out/staking_contract.wasm");
const GIGS_CODE: &[u8] = include_bytes!("../out/gigs_contract.wasm");

#[near(contract_state)]
pub struct Contract {}

impl Default for Contract {
    fn default() -> Self {
        Self {}
    }
}

#[near]
impl Contract {
    #[payable]
    pub fn deploy_contracts(&mut self, public_key: String) -> Promise {
        require!(
            env::attached_deposit() >= MIN_FUNDING_AMOUNT.saturating_mul(3),
            "Not enough attached deposit"
        );

        let public_key: PublicKey = public_key.parse().unwrap();

        let governance_account =
            String::from("governance") + "." + env::current_account_id().as_str();
        let staking_account = String::from("staking") + "." + env::current_account_id().as_str();
        let gigs_account = String::from("gigs") + "." + env::current_account_id().as_str();

        let governance_deployment = Promise::new(governance_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(GOVERNANCE_CODE.to_vec())
            .add_full_access_key(public_key.clone());

        let staking_deployment = Promise::new(staking_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(STAKING_CODE.to_vec())
            .add_full_access_key(public_key.clone());

        let gigs_deployment = Promise::new(gigs_account.parse().unwrap())
            .create_account()
            .transfer(MIN_FUNDING_AMOUNT)
            .deploy_contract(GIGS_CODE.to_vec())
            .add_full_access_key(public_key.clone());

        governance_deployment
            .and(staking_deployment)
            .and(gigs_deployment)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(5))
                    .deploy_contracts_callback(),
            )
    }

    #[private]
    pub fn deploy_contracts_callback(
        &mut self,
        #[callback_result] governance_deployment_result: Result<(), PromiseError>,
        #[callback_result] staking_deployment_result: Result<(), PromiseError>,
        #[callback_result] gigs_deployment_result: Result<(), PromiseError>,
    ) {
        if let Ok(_) = governance_deployment_result {
            log!("Governance Contract deployed successfully");
        } else {
            log!("Governance Contract deployment failed");
        }

        if let Ok(_) = staking_deployment_result {
            log!("Staking Contract deployed successfully");
        } else {
            log!("Staking Contract deployment failed");
        }

        if let Ok(_) = gigs_deployment_result {
            log!("Gigs Contract deployed successfully");
        } else {
            log!("Gigs Contract deployment failed");
        }
    }
}
