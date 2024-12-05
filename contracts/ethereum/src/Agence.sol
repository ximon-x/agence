// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {AgenceGovernor} from "./AgenceGovernor.sol";
import {AgenceTreasury} from "./AgenceTreasury.sol";
import {AgenceGigs} from "./AgenceGigs.sol";

import {AgenceToken} from "./AgenceToken.sol";
import {sUSDe} from "./mocks/sUSDe.sol";
import {USDe} from "./mocks/USDe.sol";

contract Agence {
    AgenceGovernor public immutable governor;
    AgenceTreasury public immutable treasury;
    AgenceGigs public immutable gigs;

    AgenceToken public immutable votingToken;
    sUSDe public immutable rewardsToken;
    USDe public immutable stakingToken;

    uint256 constant INITIAL_SUPPLY = 1000 ether;

    constructor() {
        votingToken = new AgenceToken(INITIAL_SUPPLY, msg.sender);
        rewardsToken = new sUSDe(INITIAL_SUPPLY, msg.sender);
        stakingToken = new USDe(INITIAL_SUPPLY, msg.sender);

        // governor = new AgenceGovernor(msg.sender);

        treasury = new AgenceTreasury(msg.sender, address(rewardsToken), address(stakingToken));

        gigs = new AgenceGigs(msg.sender);
    }
}
