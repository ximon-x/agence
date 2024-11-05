from algopy import (
    ARC4Contract,
    BoxMap,
    Application,
    Global,
    subroutine,
    Txn,
    TransactionType,
    log,
    Account,
    itxn,
)
from algopy.arc4 import abimethod, Struct, String, Address, Bool, UInt64


class User(Struct):
    role: String
    locked_stake: UInt64
    available_stake: UInt64
    total_stake: UInt64


class AgenceStaking(ARC4Contract):
    MIN_CREATION_FEE: UInt64
    MIN_STAKING_FEE: UInt64

    governance_account: Account
    governance_app: Application

    users: BoxMap[Account, User]

    def __init__(self) -> None:
        # Global Storage
        self.MIN_CREATION_FEE = UInt64(1000)
        self.MIN_STAKING_FEE = UInt64(1000)

        # Box Storage
        self.users = BoxMap(Account, User, key_prefix=b"u")

    @abimethod(create="require")
    def init(
        self,
        governance_account: Address,
        governance_app_id: UInt64,
    ) -> None:
        self.governance_account = governance_account.native
        self.governance_app = Application(governance_app_id.native)

    """
    User methods
    """

    @abimethod()
    def create_user(self, role: String) -> None:
        assert self.valid_role(role), "Invalid role"
        assert Txn.type_enum == TransactionType.Payment, "Invalid transaction type"
        assert Txn.amount >= self.MIN_CREATION_FEE.native, "Insufficient amount"
        assert Txn.sender not in self.users, "User already created"

        total_stake = UInt64(Txn.amount)
        locked_stake = UInt64(0)
        available_stake = UInt64()

        self.users[Txn.sender] = User(role, locked_stake, available_stake, total_stake)
        log("User ", Txn.sender, " created")

    @abimethod()
    def get_user(self, user: Address) -> User:
        assert Txn.sender in self.users, "User not found"
        return self.users[user.native]

    """
    Staking methods
    """

    @abimethod()
    def stake(self) -> None:
        assert Txn.sender in self.users, "User not found"
        assert Txn.amount >= self.MIN_STAKING_FEE.native, "Insufficient amount"

        user = self.users[Txn.sender].copy()

        new_total_stake = user.total_stake.native + Txn.amount
        new_available_stake = new_total_stake - user.locked_stake.native

        self.users[Txn.sender] = User(
            role=user.role,
            locked_stake=UInt64(user.locked_stake.native + Txn.amount),
            available_stake=UInt64(new_available_stake),
            total_stake=UInt64(new_total_stake),
        )

        log("User ", Txn.sender, " staked ", Txn.amount)

    @abimethod()
    def unstake(self, amount: UInt64) -> None:
        assert Txn.sender in self.users, "User not found"

        itxn.Payment(
            receiver=Txn.sender,
            amount=amount.native,
            fee=Global.min_txn_fee,
        ).submit()

        user = self.users[Txn.sender].copy()

        new_total_stake = user.total_stake.native - amount.native
        new_available_stake = new_total_stake - user.locked_stake.native

        self.users[Txn.sender] = User(
            role=user.role,
            locked_stake=UInt64(user.locked_stake.native + Txn.amount),
            available_stake=UInt64(new_available_stake),
            total_stake=UInt64(new_total_stake),
        )

        log("User ", Txn.sender, " unstaked ", amount)

    @abimethod()
    def lock_stake(self, user_address: Address, amount: UInt64) -> None:
        assert self.only_governance(), "Only the governance can start a gig"
        assert user_address.native in self.users, "User not found"

        user = self.users[user_address.native].copy()

        assert (
            amount.native <= user.available_stake.native
        ), "Insufficient available stake"

        new_locked_stake = user.locked_stake.native + amount.native
        new_available_stake = user.total_stake.native - new_locked_stake

        self.users[user_address.native] = User(
            role=user.role,
            locked_stake=UInt64(new_locked_stake),
            available_stake=UInt64(new_available_stake),
            total_stake=user.total_stake,
        )

        log("User ", user_address, " locked ", amount)

    @abimethod()
    def unlock_stake(self, user_address: Address, amount: UInt64) -> None:
        assert self.only_governance(), "Only the governance can start a gig"
        assert user_address.native in self.users, "User not found"

        user = self.users[user_address.native].copy()

        assert amount.native <= user.locked_stake.native, "Insufficient locked stake"

        new_locked_stake = user.locked_stake.native - amount.native
        new_available_stake = user.total_stake.native - new_locked_stake

        self.users[user_address.native] = User(
            role=user.role,
            locked_stake=UInt64(new_locked_stake),
            available_stake=UInt64(new_available_stake),
            total_stake=user.total_stake,
        )

        log("User ", user_address, " unlocked ", amount)

    @abimethod()
    def slash_stake(
        self, offender_address: Address, amount: UInt64, proposer_address: Address
    ) -> None:
        assert self.only_governance(), "Only the governance can start a gig"
        assert offender_address.native in self.users, "User not found"

        user = self.users[offender_address.native].copy()
        assert amount.native <= user.locked_stake.native, "Insufficient locked stake"

        itxn.Payment(
            receiver=proposer_address.native,
            amount=amount.native,
            fee=Global.min_txn_fee,
        ).submit()

        new_total_stake = user.total_stake.native - amount.native
        new_locked_stake = user.locked_stake.native - amount.native
        new_available_stake = new_total_stake - new_locked_stake

        self.users[offender_address.native] = User(
            role=user.role,
            locked_stake=UInt64(new_locked_stake),
            available_stake=UInt64(new_available_stake),
            total_stake=UInt64(new_total_stake),
        )

        log("Offender ", offender_address, " slashed ", amount)
        log("Proposer ", proposer_address, " received ", amount)

    """
    Subroutines
    """

    @subroutine
    def only_governance(self) -> Bool:
        return Bool(self.governance_account == Txn.sender)

    @subroutine
    def valid_role(self, role: String) -> Bool:
        return Bool(role == "Ace" or role == "Agency")
