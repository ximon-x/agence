from algopy import ARC4Contract, Account, Application
from algopy.arc4 import abimethod, Address, UInt64


class Agence(ARC4Contract):
    governance_account: Account
    goverance_app: Application

    staking_account: Account
    staking_app: Application

    gigs_account: Account
    gigs_app: Application

    @abimethod(create="require")
    def init(
        self,
        governance_account: Address,
        governance_app_id: UInt64,
        staking_account: Address,
        staking_app_id: UInt64,
        gigs_account: Address,
        gigs_app_id: UInt64,
    ) -> None:
        self.governance_account = governance_account.native
        self.goverance_app = Application(governance_app_id.native)

        self.staking_account = staking_account.native
        self.staking_app = Application(staking_app_id.native)

        self.gigs_account = gigs_account.native
        self.gigs_app = Application(gigs_app_id.native)

    @abimethod()
    def get_governance_account(self) -> Address:
        return Address(self.governance_account)

    @abimethod()
    def get_staking_account(self) -> Address:
        return Address(self.staking_account)

    @abimethod()
    def get_gigs_account(self) -> Address:
        return Address(self.gigs_account)

    @abimethod()
    def get_governance_app(self) -> UInt64:
        return UInt64(self.goverance_app.id)

    @abimethod()
    def get_staking_app(self) -> UInt64:
        return UInt64(self.staking_app.id)

    @abimethod()
    def get_gigs_app(self) -> UInt64:
        return UInt64(self.gigs_app.id)
