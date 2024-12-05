// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Agence {
    address public immutable governorAddress;
    address public immutable treasuryAddress;
    address public immutable gigsAddress;

    constructor(address _governorAddress, address _treasuryAddress, address _gigsAddress) {
        governorAddress = _governorAddress;
        treasuryAddress = _treasuryAddress;
        gigsAddress = _gigsAddress;
    }

    function getGovernor() external view returns (address) {
        return governorAddress;
    }

    function getTreasury() external view returns (address) {
        return treasuryAddress;
    }

    function getGigs() external view returns (address) {
        return gigsAddress;
    }
}
