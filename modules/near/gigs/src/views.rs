use near_sdk::{json_types::U64, AccountId};

use crate::{Contract, Gig};

impl Contract {
    pub fn get_gigs(&self, account: AccountId) -> Vec<(&U64, &Gig)> {
        self.gigs
            .iter()
            .filter(|(_, gig)| gig.ace == Some(account.clone()) || gig.agency == account)
            .collect()
    }

    pub fn get_gig(&self, gig_id: U64) -> Option<&Gig> {
        self.gigs.get(&gig_id)
    }
}

#[cfg(test)]
mod tests {

    use near_sdk::{test_utils::VMContextBuilder, testing_env};

    use crate::types::GigKind;

    use super::*;

    const GOVERNOR: &str = "governor";
    const AGENCY: &str = "agency";
    const ACE: &str = "ace";

    const MIN_HOURLY_RATE: u8 = 10;
    const MAX_HOURLY_RATE: u8 = 20;

    #[test]
    fn get_gig() {
        let mut contract = Contract::init(GOVERNOR.parse().unwrap());
        set_context(GOVERNOR);

        for i in 1..=10 {
            contract.create_gig(
                GigKind::FullTime,
                AGENCY.parse().unwrap(),
                MIN_HOURLY_RATE + i,
                MAX_HOURLY_RATE + i,
            );
        }

        set_context(AGENCY);
        assert_eq!(
            contract.get_gig(U64(5)).unwrap().min_hourly_rate,
            MIN_HOURLY_RATE + 5
        );

        assert_eq!(
            contract.get_gig(U64(7)).unwrap().max_hourly_rate,
            MAX_HOURLY_RATE + 7
        );
    }

    #[test]
    fn get_gigs_by_account() {
        let mut contract = Contract::init(GOVERNOR.parse().unwrap());
        set_context(GOVERNOR);

        // Create 5 gigs for AGENCY and 5 for ACE
        for i in 1..=10 {
            // Create alternating gigs for ACE and AGENCY
            if i % 2 == 0 {
                contract.create_gig(
                    GigKind::FullTime,
                    AGENCY.parse().unwrap(),
                    MIN_HOURLY_RATE,
                    MAX_HOURLY_RATE,
                );
            } else {
                contract.create_gig(
                    GigKind::FullTime,
                    ACE.parse().unwrap(),
                    MIN_HOURLY_RATE,
                    MAX_HOURLY_RATE,
                );
            }
        }

        set_context(AGENCY);
        assert_eq!(contract.get_gigs(AGENCY.parse().unwrap()).len(), 5);

        set_context(ACE);
        assert_eq!(contract.get_gigs(ACE.parse().unwrap()).len(), 5);

        println!("Breakpoint");
        // Set ACE as ace for all AGENCY's pending gigs
        set_context(GOVERNOR);
        for i in 1..=10 {
            if i % 2 == 0 {
                contract.start_gig(U64(i), ACE.parse().unwrap());
            }
        }

        // All gigs should now be ACE's gigs.
        set_context(AGENCY);
        assert_eq!(contract.get_gigs(ACE.parse().unwrap()).len(), 10);
    }

    fn set_context(predecessor: &str) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());

        testing_env!(builder.build());
    }
}
