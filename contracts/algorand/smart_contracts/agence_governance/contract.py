from algopy import ARC4Contract, Account, Application, subroutine, Global, Txn
from algopy.arc4 import Struct, DynamicArray, UInt64, abimethod, Address, String, Bool


class Proposal(Struct):
    status: String


class AgenceGovernance(ARC4Contract):
    staking_account: Account
    staking_app: Application

    gigs_account: Account
    gigs_app: Application

    proposals: DynamicArray[Proposal]
    next_proposal_id: UInt64

    def __init__(self) -> None:
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

    @subroutine
    def only_creator(self) -> Bool:
        return Bool(Global.creator_address == Txn.sender)
