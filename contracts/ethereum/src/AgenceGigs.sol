// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract AgenceGigs {
    struct Gig {
        address ace;
        address agency;
        string status;
        uint256 bindingAmount;
    }

    uint256 public nextGigId = 0;
    Gig[] public gigs;
}

// class AgenceGigs(ARC4Contract):
//     governance_account: Account
//     governance_app: Application

//     gigs: DynamicArray[Gig]
//     next_gig_id: UInt64

//     def __init__(self) -> None:
//         self.next_gig_id = UInt64(0)
//         self.gigs = DynamicArray[Gig]()

//     @abimethod(create="require")
//     def init(
//         self,
//         governance_account: Address,
//         governance_app_id: UInt64,
//     ) -> None:
//         self.governance_account = governance_account.native
//         self.governance_app_id = Application(governance_app_id.native)

//     """
//     Gig methods
//     """

//     @abimethod()
//     def create_gig(self, agency: Address, binding_amount: UInt64) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"

//         self.gigs.append(
//             Gig(
//                 ace=agency,
//                 agency=agency,
//                 status=String("Pending"),
//                 binding_amount=binding_amount,
//             )
//         )
//         self.next_gig_id = UInt64(self.next_gig_id.native + 1)

//         log("Gig ", self.next_gig_id, " created")

//     @abimethod()
//     def start_gig(self, gig_id: UInt64, selected_ace: Address) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert self.next_gig_id.native > gig_id.native, "Invalid gig ID"
//         assert self.gigs[gig_id.native].status == "Pending", "Gig is not pending"

//         old_gig = self.gigs[gig_id.native].copy()

//         self.gigs[gig_id.native] = Gig(
//             ace=selected_ace,
//             agency=old_gig.agency,
//             status=String("Active"),
//             binding_amount=old_gig.binding_amount,
//         )

//         log("Gig ", gig_id, " started")

//     @abimethod()
//     def update_gig(self, gig_id: UInt64, status: String) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert self.next_gig_id.native > gig_id.native, "Invalid gig ID"

//         gig = self.gigs[gig_id.native].copy()

//         match status.native:
//             case "Active":
//                 assert self.gigs[gig_id.native].status == "Pending", "Gig is not active"
//                 self.gigs[gig_id.native] = Gig(
//                     ace=gig.ace,
//                     agency=gig.agency,
//                     status=String("Active"),
//                     binding_amount=gig.binding_amount,
//                 )

//             case "Canceled":
//                 assert self.gigs[gig_id.native].status == "Pending", "Gig is not active"
//                 self.gigs[gig_id.native] = Gig(
//                     ace=gig.ace,
//                     agency=gig.agency,
//                     status=String("Canceled"),
//                     binding_amount=gig.binding_amount,
//                 )

//             case "Completed":
//                 assert self.gigs[gig_id.native].status == "Active", "Gig is not active"
//                 self.gigs[gig_id.native] = Gig(
//                     ace=gig.ace,
//                     agency=gig.agency,
//                     status=String("Completed"),
//                     binding_amount=gig.binding_amount,
//                 )

//             case _:
//                 assert False, "Invalid status"

//         log("Gig ", gig_id, " updated to ", status)

//     @abimethod()
//     def get_gigs(self) -> DynamicArray[Gig]:
//         return self.gigs

//     @abimethod()
//     def get_gig_by_address(self, user_address: Address) -> DynamicArray[Gig]:
//         user_gigs = DynamicArray[Gig]()
//         n = self.next_gig_id

//         for i in urange(n.native):
//             if self.gigs[i].ace == user_address or self.gigs[i].agency == user_address:
//                 user_gigs.append(self.gigs[i].copy())

//         return user_gigs

//     @abimethod()
//     def get_gig(self, gig_id: UInt64) -> Gig:
//         assert self.next_gig_id.native > gig_id.native, "Invalid gig ID"
//         return self.gigs[gig_id.native]

//     """
//     Subroutines
//     """

//     @subroutine
//     def only_governance(self) -> Bool:
//         return Bool(self.governance_account == Txn.sender)
