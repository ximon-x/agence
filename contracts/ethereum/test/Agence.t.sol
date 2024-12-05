// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {Agence} from "../src/Agence.sol";

contract AgenceTest is Test {
    Agence public agence;

    function setUp() public {}

    function testDeployment() public {
        agence = new Agence();

        assertEq(agence.votingToken().totalSupply(), 1000 ether);
        assertEq(agence.stakingToken().totalSupply(), 1000 ether);
        assertEq(agence.rewardsToken().totalSupply(), 1000 ether);
    }
}
