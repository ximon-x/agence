// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

event UserCreated(address userAddress, uint256 amount);

error UserAlreadyCreated();

contract AgenceTreasury is Ownable {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    enum Role {
        Ace,
        Agency
    }

    struct User {
        Role role;
        uint256 locked_stake;
        uint256 available_stake;
        uint256 total_stake;
    }

    mapping(address => User) public users;

    constructor(address _agence, address _stakingToken, address _rewardsToken) Ownable(_agence) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    receive() external payable {}

    fallback() external payable {}

    function createUser(address userAddress, uint256 amount, bool isAce) external onlyOwner {
        users[userAddress] = User(isAce ? Role.Ace : Role.Agency, 0, amount, amount);

        emit UserCreated(userAddress, amount);
    }

    function getUser(address userAddress) external view returns (User memory) {
        return users[userAddress];
    }

    function stake(address userAddress, uint256 amount) external {
        users[userAddress].total_stake += amount;
        users[userAddress].available_stake += amount;
    }
}

//     @abimethod()
//     def stake(self, user_address: Address, amount: UInt64) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert user_address.native in self.users, "User not found"

//         user = self.users[user_address.native].copy()

//         new_total_stake = user.total_stake.native + amount.native
//         new_available_stake = new_total_stake - user.locked_stake.native

//         self.users[user_address.native] = User(
//             role=user.role,
//             locked_stake=UInt64(user.locked_stake.native + amount.native),
//             available_stake=UInt64(new_available_stake),
//             total_stake=UInt64(new_total_stake),
//         )

//         log("User ", user_address, " staked ", amount)

//     @abimethod()
//     def unstake(self, user_address: Address, amount: UInt64) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert user_address.native in self.users, "User not found"

//         user = self.users[user_address.native].copy()
//         assert amount.native <= user.available_stake.native, "Insufficient locked stake"

//         itxn.Payment(
//             receiver=user_address.native,
//             amount=amount.native,
//             fee=Global.min_txn_fee,
//         ).submit()

//         new_total_stake = user.total_stake.native - amount.native
//         new_available_stake = new_total_stake - user.locked_stake.native

//         self.users[user_address.native] = User(
//             role=user.role,
//             locked_stake=UInt64(user.locked_stake.native + amount.native),
//             available_stake=UInt64(new_available_stake),
//             total_stake=UInt64(new_total_stake),
//         )

//         log("User ", user_address, " unstaked ", amount)

//     @abimethod()
//     def lock_stake(self, user_address: Address, amount: UInt64) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert user_address.native in self.users, "User not found"

//         user = self.users[user_address.native].copy()

//         assert (
//             amount.native <= user.available_stake.native
//         ), "Insufficient available stake"

//         new_locked_stake = user.locked_stake.native + amount.native
//         new_available_stake = user.total_stake.native - new_locked_stake

//         self.users[user_address.native] = User(
//             role=user.role,
//             locked_stake=UInt64(new_locked_stake),
//             available_stake=UInt64(new_available_stake),
//             total_stake=user.total_stake,
//         )

//         log("User ", user_address, " locked ", amount)

//     @abimethod()
//     def unlock_stake(self, user_address: Address, amount: UInt64) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert user_address.native in self.users, "User not found"

//         user = self.users[user_address.native].copy()

//         assert amount.native <= user.locked_stake.native, "Insufficient locked stake"

//         new_locked_stake = user.locked_stake.native - amount.native
//         new_available_stake = user.total_stake.native - new_locked_stake

//         self.users[user_address.native] = User(
//             role=user.role,
//             locked_stake=UInt64(new_locked_stake),
//             available_stake=UInt64(new_available_stake),
//             total_stake=user.total_stake,
//         )

//         log("User ", user_address, " unlocked ", amount)

//     @abimethod()
//     def slash_stake(
//         self, offender_address: Address, amount: UInt64, proposer_address: Address
//     ) -> None:
//         assert (
//             self.only_governance()
//         ), "Only the governance contract can call this method"
//         assert offender_address.native in self.users, "User not found"

//         user = self.users[offender_address.native].copy()
//         assert amount.native <= user.locked_stake.native, "Insufficient locked stake"

//         itxn.Payment(
//             receiver=proposer_address.native,
//             amount=amount.native,
//             fee=Global.min_txn_fee,
//         ).submit()

//         new_total_stake = user.total_stake.native - amount.native
//         new_locked_stake = user.locked_stake.native - amount.native
//         new_available_stake = new_total_stake - new_locked_stake

//         self.users[offender_address.native] = User(
//             role=user.role,
//             locked_stake=UInt64(new_locked_stake),
//             available_stake=UInt64(new_available_stake),
//             total_stake=UInt64(new_total_stake),
//         )

//         log("Offender ", offender_address, " slashed ", amount)
//         log("Proposer ", proposer_address, " received ", amount)

//     """
//     Subroutines
//     """

//     @subroutine
//     def only_governance(self) -> Bool:
//         return Bool(self.governance_account == Txn.sender)

//     @subroutine
//     def valid_role(self, role: String) -> Bool:
//         return Bool(role == "Ace" or role == "Agency")