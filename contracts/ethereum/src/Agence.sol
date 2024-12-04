// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Agence {
    address public immutable governanceContract;
    address public immutable stakingContract;
    address public immutable gigsContract;

    constructor(address _governanceContract, address _stakingContract, address _gigsContract) {
        governanceContract = _governanceContract;
        stakingContract = _stakingContract;
        gigsContract = _gigsContract;
    }

    function getGovernance() external view returns (address) {
        return governanceContract;
    }

    function getStaking() external view returns (address) {
        return stakingContract;
    }

    function getGigs() external view returns (address) {
        return gigsContract;
    }
}
