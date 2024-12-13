// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {AgenceTreasury, Stake} from "./AgenceTreasury.sol";
import {Agence, User, Role} from "./Agence.sol";

enum Status {
    Pending,
    Active,
    Canceled,
    Flagged,
    Completed
}

struct Gig {
    uint256 id;
    address ace;
    address agency;
    Status status;
    uint256 bindingAmount;
}

event GigCreated(address agency, uint256 bindingAmount);
event GigStarted(address ace, address agency);
event GigFlagged(address ace, address agency);
event GigCanceled(address ace, address agency);
event GigCompleted(address ace, address agency);

error UserNotRegistered();
error InsufficientFunds();
error InvalidGigStatus();
error InvalidUserRole();
error InvalidGigId();

contract AgenceGigs is Ownable {
    Agence public immutable agenceContract;
    AgenceTreasury public immutable treasuryContract;

    Gig[] public gigs;

    modifier onlyAces {
        User memory user = agenceContract.getUser(msg.sender);
        require(user.isValid, UserNotRegistered());
        require(user.role == Role.Ace, InvalidUserRole());

        _;
    }

    modifier onlyAgencies {
        User memory user = agenceContract.getUser(msg.sender);
        require(user.isValid, UserNotRegistered());
        require(user.role == Role.Agency, InvalidUserRole());

        _;
    }

    constructor(Agence _agence, AgenceTreasury _treasury) Ownable(address(_agence)) {
        agenceContract = Agence(_agence);
        treasuryContract = AgenceTreasury(_treasury);
    }

    /**
     * @notice Creates a new gig.
     * @dev Only agencies can create new gigs.
     * @dev The gig is created with a pending status.
     * @dev Reverts if the binding amount is greater than the agency's available stake.
     * @param _bindingAmount The binding amount of the gig.
     * */
    function createGig(
        uint256 _bindingAmount
    ) external onlyAgencies {
        Stake memory stake = treasuryContract.getStake(msg.sender);

        require(
            _bindingAmount <= stake.availableStake,
            InsufficientFunds()
        );

        Gig memory newGig = Gig({
            id: gigs.length,
            ace: address(0x0),
            agency: msg.sender,
            status: Status.Pending,
            bindingAmount: _bindingAmount
        });

        gigs.push(newGig);
        emit GigCreated(msg.sender, _bindingAmount);
    }

    /**
     * @notice Starts a pending gig.
     * @notice Only agencies can start new gigs.
     * @dev Reverts if the gig id is invalid.
     * @dev Reverts if the gig is not in a pending status.
     * @dev Reverts if the gig does not belong to the agency.
     * @param gigId The id of the gig to start.
     * @param ace The address of the ace to start the gig with.
     * */
    function startGig(
        uint256 gigId,
        address ace
    ) external onlyAgencies {
        require(gigs.length > gigId, InvalidGigId());
        Gig memory gig = gigs[gigId];

        require (gig.agency == msg.sender, InvalidGigId());
        require (gig.ace == address(0x0), InvalidGigStatus());
        require (gig.status == Status.Pending, InvalidGigStatus());

        Gig memory newGig = Gig({
            id: gig.id,
            ace: ace,
            agency: gig.agency,
            status: Status.Active,
            bindingAmount: gig.bindingAmount
        });

        gigs[gigId] = newGig;
        emit GigStarted(newGig.ace, newGig.agency);
    }

    /**
     * @notice Cancels a pending gig.
     * @notice Only agencies can cancel pending gigs.
     * @dev Reverts if the gig id is invalid.
     * @dev Reverts if the gig is not in a pending status.
     * @dev Reverts if the gig has an ace associated with it.
     * @dev Reverts if the gig does not belong to the agency.
     * @param gigId The id of the gig to cancel.
     * */
    function cancelGig(
        uint256 gigId
    ) external onlyAgencies {
        require(gigs.length > gigId, InvalidGigId());
        Gig memory gig = gigs[gigId];

        require (gig.agency == msg.sender, InvalidGigId());
        require (gig.ace == address(0x0), InvalidGigStatus());
        require (gig.status == Status.Pending, InvalidGigStatus());

        Gig memory newGig = Gig({
            id: gig.id,
            ace: address(0x0),
            agency: gig.agency,
            status: Status.Canceled,
            bindingAmount: gig.bindingAmount
        });

        gigs[gigId] = newGig;
        emit GigCanceled(newGig.ace, newGig.agency);
    }

    /**
     * @notice Completes an active gig.
     * @notice Only the Agence contract can call this function.
     * @dev Reverts if the gig id is invalid.
     * @dev Reverts if the gig is not in an active status.
     * @dev Reverts if the gig does not have an ace associated with it.
     * @param gigId The id of the gig to complete.
     * */
    function completeGig(
        uint256 gigId
    ) external onlyOwner {
        require(gigs.length > gigId, InvalidGigId());
        Gig memory gig = gigs[gigId];

        require (gig.ace != address(0x0), InvalidGigStatus());
        require (gig.status == Status.Active, InvalidGigStatus());

        Gig memory newGig = Gig({
            id: gig.id,
            ace: gig.ace,
            agency: gig.agency,
            status: Status.Completed,
            bindingAmount: gig.bindingAmount
        });

        gigs[gigId] = newGig;
        emit GigCompleted(newGig.ace, newGig.agency);
    }

    /**
     * @notice Flags an active gig.
     * @notice Only the Agence contract can call this function.
     * @dev Reverts if the gig id is invalid.
     * @dev Reverts if the gig is not in an active status.
     * @dev Reverts if the gig does not have an ace associated with it.
     * @param gigId The id of the gig to flag.
     */
    function flagGig(
        uint256 gigId
    ) external onlyOwner {
        require(gigs.length > gigId, InvalidGigId());
        Gig memory gig = gigs[gigId];

        require(gig.ace != address(0x0), InvalidGigStatus());
        require(gig.status == Status.Active, InvalidGigStatus());

        Gig memory newGig = Gig({
            id: gig.id,
            ace: gig.ace,
            agency: gig.agency,
            status: Status.Flagged,
            bindingAmount: gig.bindingAmount
        });

        gigs[gigId] = newGig;
        emit GigFlagged(newGig.ace, newGig.agency);
    }


    /**
     * @notice Returns a single gig by id.
     * @dev Reverts if the gig id is invalid.
     * @param gigId The id of the gig to retrieve.
     * @return The Gig struct associated with the given id.
     */
    function getGig(
        uint256 gigId
    ) external view returns (Gig memory) {
        require (gigs.length > gigId, InvalidGigId());
        Gig memory gig = gigs[gigId];

        return gig;
    }

    /**
     * @notice Returns an array of all gigs.
     * @dev Reverts if the gig id is invalid.
     * @return An array of Gig structs.
     */
    function getGigs(
    ) external view returns (Gig[] memory) {
        return gigs;
    }
}
