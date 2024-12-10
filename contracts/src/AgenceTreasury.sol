// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {Agence, User} from "./Agence.sol";

struct Stake {
    bool isValid;
    uint256 lockedStake;
    uint256 availableStake;
}

event StakeDeposited(address indexed user, address indexed token, uint256 amount);
event StakeWithdrawn(address indexed user, address indexed token, uint256 amount);
event StakeLocked(address indexed user, address indexed token, uint256 amount);
event StakeUnlocked(address indexed user, address indexed token, uint256 amount);
event StakeSlashed(address indexed offender, address indexed proposer, address indexed token, uint256 amount);
event RewardsClaimed(address indexed user, address indexed token, uint256 amount);

error InsufficientTokenAllowance();
error InsufficientFunds();
error UserNotRegistered();
error DepositTooSmall();
error TransferFailed();

contract AgenceTreasury is Ownable, ReentrancyGuard {
    Agence public immutable agenceContract;

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;
    IERC20 public immutable votingToken;

    uint256 constant MIN_STAKE = 1 ether;

    mapping (address => Stake) public stakes;

    modifier onlyUsers {
        User memory user = agenceContract.getUser(msg.sender);
        require(user.isValid, UserNotRegistered());

        if (!stakes[msg.sender].isValid) {
            stakes[msg.sender] = Stake({
                isValid: true,
                lockedStake: 0,
                availableStake: 0
            });
        }

        _;
    }

    constructor(
        Agence _agence,
        IERC20 _stakingToken,
        IERC20 _rewardsToken,
        IERC20 _votingToken
    ) Ownable(address(_agence)) {
        agenceContract = _agence;

        stakingToken = _stakingToken;
        rewardsToken = _rewardsToken;
        votingToken = _votingToken;
    }

    /**
     * @notice Locks a user's stake.
     * @notice Stake locking is required in order to participate in a gig.
     * @dev Reverts if the user is not registered.
     * @dev Reverts if the user does not have enough available stake.
     * @param amount The amount of stake to be locked.
     * @param userAddress The address of the user to lock the stake of.
     */
    function lock(uint256 amount, address userAddress) external onlyOwner {
        User memory user = agenceContract.getUser(userAddress);

        require(user.isValid, UserNotRegistered()); 
        require(amount <= stakes[userAddress].availableStake, InsufficientFunds());

        stakes[userAddress].lockedStake += amount;
        stakes[userAddress].availableStake -= amount;

        emit StakeLocked(userAddress, address(stakingToken), amount);
    }

    /**
     * @notice Unlocks a user's stake.
     * @notice Stake unlocking occurs when a gig is completed or canceled.
     * @dev Reverts if the user is not registered.
     * @dev Reverts if the user does not have enough locked stake.
     * @param amount The amount of stake to be unlocked.
     * @param userAddress The address of the user to unlock the stake of.
     */
    function unlock(uint256 amount, address userAddress) external onlyOwner {
        User memory user = agenceContract.getUser(userAddress);

        require(user.isValid, UserNotRegistered());
        require(amount <= stakes[userAddress].lockedStake, InsufficientFunds());

        stakes[userAddress].lockedStake -= amount;
        stakes[userAddress].availableStake += amount;

        emit StakeUnlocked(userAddress, address(stakingToken), amount);
    }

    /**
     * @notice Slashes a user's stake.
     * @notice Stake slashing occurs when a user is penalized for misbehavior.
     * @dev Reverts if the offender is not registered.
     * @dev Reverts if the proposer is not registered.
     * @dev Reverts if the offender does not have enough locked stake.
     * @param amount The amount of stake to be slashed.
     * @param offenderAddress The address of the user to slash the stake of.
     * @param proposerAddress The address of the user who proposed the slash (Ace or Agency).
     */
    function slash(uint256 amount, address offenderAddress, address proposerAddress) external onlyOwner {
        User memory offender = agenceContract.getUser(offenderAddress);
        User memory proposer = agenceContract.getUser(proposerAddress);
        
        require(offender.isValid, UserNotRegistered());
        require(proposer.isValid, UserNotRegistered());
        require(amount <= stakes[offenderAddress].lockedStake, InsufficientFunds());

        stakes[offenderAddress].lockedStake -= amount;
        stakes[proposerAddress].lockedStake += amount;

        emit StakeSlashed(offenderAddress, proposerAddress, address(stakingToken), amount);
    }

    /** 
     * @notice Deposits a user's stake.
     * @notice Sends the equivalent AGE tokens to the user.
     * @dev Reverts if the stake is less than the minimum stake.
     * @dev Reverts if the user does not have enough funds.
     * @dev Reverts if the user has not approved the amount of tokens to be transferred.
     * @param amount The amount of the stake to be deposited.
    */
    function deposit(uint256 amount) external onlyUsers nonReentrant {
        // Sanity Checks
        require(amount >= MIN_STAKE, DepositTooSmall());

        require(
            stakingToken.balanceOf(msg.sender) >= amount, 
            InsufficientFunds()
        );

        require(
            stakingToken.allowance(msg.sender, address(this)) >= amount, 
            InsufficientTokenAllowance()
        );

        require (
            votingToken.balanceOf(address(this)) >= amount, 
            InsufficientFunds()
        );
        
        // Transfer tokens from user to contract
        bool success = stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, TransferFailed());

        // Transfer tokens from contract to user
        success = votingToken.transferFrom(msg.sender, address(this), amount);
        require(success, TransferFailed());
        
        // Update user's balance
        stakes[msg.sender].availableStake += amount;
        
        // Emit deposit event
        emit StakeDeposited(msg.sender, address(stakingToken), amount);
    }

    /**
     * @notice Withdraws a user's stake.
     * @notice The equivalent AGE tokens are sent to the contract.
     * @dev Reverts if the user does not have enough available stake.
     * @dev Reverts if the transfer fails.
     * @param amount The amount of the stake to be withdrawn.
    */
    function withdraw(uint256 amount) external onlyUsers nonReentrant {
        // Sanity Checks
        require(stakes[msg.sender].availableStake <= amount, InsufficientFunds());

        require(
            votingToken.balanceOf(msg.sender) >= amount, 
            InsufficientFunds()
        );

        require(
            votingToken.allowance(msg.sender, address(this)) >= amount, 
            InsufficientTokenAllowance()
        );

        require (
            stakingToken.balanceOf(address(this)) >= amount, 
            InsufficientFunds()
        );
        
        // Transfer tokens from contract to user
        bool success = stakingToken.transfer(msg.sender, amount);
        require(success, TransferFailed());

        // Transfer tokens from user to contract
        success = votingToken.transferFrom(msg.sender, address(this), amount);
        require(success, TransferFailed());
        
        // Update user's balance
        stakes[msg.sender].availableStake -= amount;
        
        // Emit withdraw event
        emit StakeWithdrawn(msg.sender, address(stakingToken), amount);
    }

    /**
     * @notice Claims rewards for the user.
     * @notice Simulates a claim of accrued rewards for the user.
     * @dev Reverts if the contract does not have enough funds.
     */
    function claim() external onlyUsers nonReentrant {
        uint256 amount = 1 ether;

        require(
            stakingToken.balanceOf(address(this)) >= amount, 
            InsufficientFunds()
        );

        // Transfer tokens from contract to user
        bool success = stakingToken.transfer(msg.sender, amount);
        require(success, TransferFailed());

        // Emit rewards claimed event
        emit RewardsClaimed(msg.sender, address(stakingToken), amount);
    }

    function getStake(address userAddress) external view returns (Stake memory) {
        return stakes[userAddress];
    }
}