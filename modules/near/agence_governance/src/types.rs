use near_sdk::near;

pub enum ProposalStatus {
    Pending,
    Accepted,
    Rejected,
    Removed,
    Canceled,
    Expired,
}

pub enum Vote {
    Accepted,
    Reject,
    Remove,
}

#[near(serializers = [json, borsh])]
pub struct Proposal {}
