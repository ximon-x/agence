from typing import TypeAlias, Literal

from algopy import (
    ARC4Contract,
    Account,
    Application,
    subroutine,
    Global,
    Txn,
    itxn,
    log,
)
from algopy.arc4 import (
    Struct,
    abi_call,
    DynamicArray,
    UInt64,
    abimethod,
    Address,
    String,
    Bool,
    StaticArray,
)

from smart_contracts.agence_staking.contract import AgenceStaking
# from smart_contracts.agence_gigs.;ontract import AgenceGigs


# export type ProposalStatus =
#   | "Pending"
#   | "Approved"
#   | "Rejected"
#   | "Removed"
#   | "Expired";

# export type ProposalKind =
#   | "ReportScam"
#   | "ReportSpam"
#   | "ReportSham"

# export type Votes = {
#   approve: number;
#   reject: number;
#   remove: number;
# };

Votes: TypeAlias = StaticArray[UInt64, Literal[3]]


class Proposal(Struct):
    proposer: Address
    offender: Address
    votes: Votes
    status: String
    kind: String
    metadata: String
    end_time: UInt64


class AgenceGovernance(ARC4Contract):
    PROPOSAL_CREATION_FEE: UInt64
    USER_CREATION_FEE: UInt64
    GIG_CREATION_FEE: UInt64
    MIN_STAKING: UInt64

    staking_account: Account
    staking_app: Application

    gigs_account: Account
    gigs_app: Application

    proposals: DynamicArray[Proposal]
    next_proposal_id: UInt64

    def __init__(self) -> None:
        self.PROPOSAL_CREATION_FEE = UInt64(10_000)
        self.USER_CREATION_FEE = UInt64(10_000)
        self.GIG_CREATION_FEE = UInt64(10_000)
        self.MIN_STAKING = UInt64(10_000)

        self.next_proposal_id = UInt64(0)
        self.proposals = DynamicArray[Proposal]()

    @abimethod()
    def init(
        self,
        staking_account: Address,
        staking_app_id: UInt64,
        gigs_account: Address,
        gigs_app_id: UInt64,
    ) -> None:
        assert self.only_creator(), "Only the creator can init the contract"

        self.staking_account = staking_account.native
        self.staking_app = Application(staking_app_id.native)

        self.gigs_account = gigs_account.native
        self.gigs_app = Application(gigs_app_id.native)

    """
    Proposal Methods
    """

    @abimethod()
    def create_proposal(
        self,
        proposer: Address,
        offender: Address,
        kind: String,
        metadata: String,
        end_time: UInt64,
    ) -> None:
        pass

    """
    User-facing Methods
    """

    @abimethod()
    def register(self, role: String) -> None:
        assert Txn.amount >= self.USER_CREATION_FEE.native, "Insufficient funds"

        staked_amount = Txn.amount - self.USER_CREATION_FEE.native
        user = Txn.sender

        itxn.Payment(
            receiver=self.staking_account,
            amount=staked_amount,
            fee=Global.min_txn_fee,
        ).submit()

        abi_call(
            AgenceStaking.create_user,
            user,
            staked_amount,
            role,
            app_id=self.staking_app.id,
            fee=Global.min_txn_fee,
        )

        log("User ", user, " registered")

    @abimethod()
    def deposit(self) -> None:
        assert Txn.amount >= self.MIN_STAKING.native, "Not Enough funds"

        itxn.Payment(
            receiver=self.staking_account,
            amount=Txn.amount,
            fee=Global.min_txn_fee,
        ).submit()

        abi_call(
            AgenceStaking.stake,
            Txn.sender,
            Txn.amount,
            app_id=self.staking_app.id,
            fee=Global.min_txn_fee,
        )

        log("User ", Txn.sender, " staked", Txn.amount)

    @abimethod()
    def withdraw(self) -> None:
        abi_call(
            AgenceStaking.unstake,
            Txn.sender,
            Txn.amount,
            app_id=self.staking_app.id,
            fee=Global.min_txn_fee,
        )

        log("User ", Txn.sender, " unstaked", Txn.amount)

    """ 
    Ace & Agency Methods
    """

    """
    Subroutines
    """

    @subroutine
    def only_creator(self) -> Bool:
        return Bool(Global.creator_address == Txn.sender)
