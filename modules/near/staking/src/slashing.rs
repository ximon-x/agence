use near_sdk::{AccountId, NearToken, Promise};

use crate::{
    types::{SlashKind, Stake},
    Contract,
};

const SCAM_SLASH_PERCENT: u8 = 80;
const SHAM_SLASH_PERCENT: u8 = 50;
const SPAM_SLASH_PERCENT: u8 = 20;

impl Contract {
    pub fn slash(
        &mut self,
        user_id: AccountId,
        reporter_id: AccountId,
        amount: NearToken,
        kind: SlashKind,
    ) {
        self.only_governance_or_gigs();

        let slash_amount =
            match kind {
                SlashKind::Scam => amount
                    .saturating_div((SCAM_SLASH_PERCENT as u128).saturating_mul(10_u128.pow(9))),

                SlashKind::Sham => amount
                    .saturating_div((SHAM_SLASH_PERCENT as u128).saturating_mul(10_u128.pow(9))),

                SlashKind::Spam => amount
                    .saturating_div((SPAM_SLASH_PERCENT as u128).saturating_mul(10_u128.pow(9))),
            };

        Promise::new(reporter_id).transfer(slash_amount);

        let stake = self.stakes.get(&user_id).unwrap();

        let total_stake = stake.total_stake.saturating_sub(slash_amount);
        let locked_stake = stake.locked_stake.saturating_sub(slash_amount);
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
}
