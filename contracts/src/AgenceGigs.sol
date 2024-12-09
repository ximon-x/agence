// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AgenceGigs is Ownable {
    // Type Declarations
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

    // State Variables
    mapping(address => Gig[]) public gigsByAddress;

    // Events
    event GigCreated(address agency, uint256 bindingAmount);
    event GigStarted(address ace, address agency);
    event GigFlagged(address ace, address agency);
    event GigCanceled(address ace, address agency);
    event GigCompleted(address ace, address agency);

    // Errors
    error InvalidGigStatus();
    error InvalidGigId();

    constructor(address _agence) Ownable(_agence) {}

    receive() external payable {}

    fallback() external payable {}

    // External Functions
    function createGig(
        address _agency,
        uint256 _bindingAmount
    ) external payable onlyOwner {
        uint256 n = gigsByAddress[_agency].length;

        Gig memory newGig = Gig({
            id: n,
            ace: msg.sender,
            agency: _agency,
            status: Status.Pending,
            bindingAmount: _bindingAmount
        });

        gigsByAddress[_agency].push(newGig);
        emit GigCreated(_agency, _bindingAmount);
    }

    function startGig(
        uint256 gigId,
        address agency,
        address ace
    ) external onlyOwner {
        if (gigsByAddress[agency].length <= gigId) {
            revert InvalidGigId();
        }

        Gig memory gig = gigsByAddress[agency][gigId];

        if (gig.status != Status.Pending) {
            revert InvalidGigStatus();
        }

        gigsByAddress[agency][gigId].status = Status.Active;
        gigsByAddress[agency][gigId].ace = ace;

        gigsByAddress[ace].push(gig);
        emit GigStarted(ace, agency);
    }

    function cancelGig(
        uint256 gigId,
        address agency,
        address ace
    ) external onlyOwner {
        if (gigsByAddress[msg.sender].length <= gigId) {
            revert InvalidGigId();
        }

        if (gigsByAddress[agency][gigId].status != Status.Active) {
            revert InvalidGigStatus();
        }

        gigsByAddress[agency][gigId].status = Status.Canceled;

        for (uint256 i = 0; i < gigsByAddress[ace].length; i++) {
            if (gigsByAddress[ace][i].id == gigId) {
                gigsByAddress[ace][i].status = Status.Canceled;
            }
        }
        emit GigCanceled(ace, agency);
    }

    function completeGig(
        uint256 gigId,
        address agency,
        address ace
    ) external onlyOwner {
        if (gigsByAddress[msg.sender].length <= gigId) {
            revert InvalidGigId();
        }

        if (gigsByAddress[agency][gigId].status != Status.Active) {
            revert InvalidGigStatus();
        }

        gigsByAddress[agency][gigId].status = Status.Completed;

        for (uint256 i = 0; i < gigsByAddress[ace].length; i++) {
            if (gigsByAddress[ace][i].id == gigId) {
                gigsByAddress[ace][i].status = Status.Completed;
            }
        }

        emit GigCompleted(ace, agency);
    }

    function flagGig(
        uint256 gigId,
        address agency,
        address ace
    ) external onlyOwner {
        if (gigsByAddress[msg.sender].length <= gigId) {
            revert InvalidGigId();
        }

        if (gigsByAddress[agency][gigId].status != Status.Active) {
            revert InvalidGigStatus();
        }

        gigsByAddress[agency][gigId].status = Status.Flagged;

        for (uint256 i = 0; i < gigsByAddress[ace].length; i++) {
            if (gigsByAddress[ace][i].id == gigId) {
                gigsByAddress[ace][i].status = Status.Flagged;
            }
        }

        emit GigFlagged(ace, agency);
    }

    function getGigsByAddress(
        address user
    ) external view returns (Gig[] memory) {
        return gigsByAddress[user];
    }

    function getGig(
        uint256 gigId,
        address user
    ) external view returns (Gig memory) {
        if (gigsByAddress[user].length <= gigId) {
            revert InvalidGigId();
        }

        Gig memory gig;

        for (uint256 i = 0; i < gigsByAddress[user].length; i++) {
            if (gigsByAddress[user][i].id == gigId) {
                gig = gigsByAddress[user][i];
            }
        }

        return gig;
    }
}
