use near_sdk::{json_types::U64, near, require, AccountId, NearToken};

use crate::{
    types::{GigKind, GigStatus, RejectionReason},
    Contract, ContractExt, Gig,
};

#[near]
impl Contract {
    pub fn create_gig(
        &mut self,
        kind: GigKind,
        agency: AccountId,
        binding_amount: NearToken,
        min_hourly_rate: u8,
        max_hourly_rate: u8,
    ) -> U64 {
        self.only_governance_or_staking();

        let curr_id: u64 = self.next_gig_id.into();
        let next_id: U64 = U64::from(curr_id + 1);

        let gig = Gig {
            kind,
            ace: None,
            binding_amount,
            min_hourly_rate,
            max_hourly_rate,
            agency: agency.clone(),
            id: U64(curr_id),
            status: GigStatus::Unverified,
        };

        self.gigs.insert(U64(curr_id), gig);
        self.next_gig_id = next_id;

        U64(curr_id)
    }

    pub fn verify_gig(&mut self, gig_id: U64) {
        self.only_governance_or_staking();

        require!(self.gigs.get(&gig_id).is_some(), "Gig not found.");

        let gig = self.gigs.get_mut(&gig_id).unwrap();
        gig.status = GigStatus::Pending;
    }

    pub fn start_gig(&mut self, gig_id: U64, ace: AccountId) {
        self.only_governance_or_staking();

        require!(self.gigs.get(&gig_id).is_some(), "Gig not found.");
        require!(self.gigs.get(&gig_id).unwrap().status == GigStatus::Pending);

        let gig = self.gigs.get_mut(&gig_id).unwrap();
        gig.ace = Some(ace);

        self.update_gig_status(gig_id, GigStatus::Active);
    }

    pub fn update_gig_status(&mut self, gig_id: U64, status: GigStatus) {
        require!(
            !matches!(
                self.gigs.get(&gig_id).unwrap().status,
                GigStatus::Rejected { .. }
            ),
            "Gig has been rejected."
        );

        let gig = self.gigs.get_mut(&gig_id).expect("Gig not found");
        gig.status = status;
    }

    pub fn flag_gig(&mut self, gig_id: U64, reason: RejectionReason) {
        self.only_governance_or_staking();

        require!(self.gigs.get(&gig_id).is_some(), "Gig not found.");

        let gig = self.gigs.get_mut(&gig_id).unwrap();
        gig.status = GigStatus::Rejected { reason };
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

    const MIN_HOURLY_RATE: u8 = 10;
    const MAX_HOURLY_RATE: u8 = 20;

    #[test]
    fn staking_account_create_gig() {
        set_context(GOVERNOR);
        let mut contract = Contract::init(GOVERNOR.parse().unwrap(), STAKING.parse().unwrap());

        set_context(STAKING);
        let id = contract.create_gig(
            GigKind::FullTime,
            AGENCY.parse().unwrap(),
            NearToken::from_millinear(5 * 10u128.pow(3)),
            MIN_HOURLY_RATE,
            MAX_HOURLY_RATE,
        );

        assert_eq!(id, U64(1));
    }

    #[test]
    #[should_panic]
    fn non_staking_account_create_gig() {
        set_context(ACE);
        let mut contract = Contract::init(GOVERNOR.parse().unwrap(), STAKING.parse().unwrap());

        let id = contract.create_gig(
            GigKind::FullTime,
            AGENCY.parse().unwrap(),
            NearToken::from_millinear(5 * 10u128.pow(3)),
            MIN_HOURLY_RATE,
            MAX_HOURLY_RATE,
        );

        // This should not be equal as the above call should panic.
        assert_ne!(id, U64(1));
    }

    #[test]
    fn update_pending_gig() {
        set_context(GOVERNOR);
        let mut contract = Contract::init(GOVERNOR.parse().unwrap(), STAKING.parse().unwrap());

        set_context(STAKING);
        let id = contract.create_gig(
            GigKind::FullTime,
            AGENCY.parse().unwrap(),
            NearToken::from_millinear(5 * 10u128.pow(3)),
            MIN_HOURLY_RATE,
            MAX_HOURLY_RATE,
        );

        contract.verify_gig(id);

        contract.start_gig(id, AGENCY.parse().unwrap());
        assert_eq!(contract.get_gig(id).unwrap().status, GigStatus::Active);

        contract.update_gig_status(id, GigStatus::Completed);
        assert_eq!(contract.get_gig(id).unwrap().status, GigStatus::Completed);
    }

    #[test]
    #[should_panic]
    fn update_non_pending_gig() {
        set_context(GOVERNOR);
        let mut contract = Contract::init(GOVERNOR.parse().unwrap(), STAKING.parse().unwrap());

        set_context(STAKING);
        let id = contract.create_gig(
            GigKind::FullTime,
            AGENCY.parse().unwrap(),
            NearToken::from_millinear(5 * 10u128.pow(3)),
            MIN_HOURLY_RATE,
            MAX_HOURLY_RATE,
        );

        contract.verify_gig(id);

        contract.update_gig_status(
            id,
            GigStatus::Rejected {
                reason: RejectionReason::Scam,
            },
        );

        // Starting the flagged gig should panic.
        contract.start_gig(id, ACE.parse().unwrap());

        // Completing the flagged gig should panic.
        contract.update_gig_status(id, GigStatus::Completed);

        // Canceling the flagged gig should panic.
        contract.update_gig_status(id, GigStatus::Canceled);

        // Expiring the flagged gig should panic.
        contract.update_gig_status(id, GigStatus::Expired);
    }

    fn set_context(predecessor: &str) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());

        testing_env!(builder.build());
    }
}
