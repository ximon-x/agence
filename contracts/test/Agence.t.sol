// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {Agence} from "../src/Agence.sol";

contract AgenceTest is Test {
    Agence public agence;

    uint32 private aEid = 1;
    uint32 private bEid = 2;

    address private userA = address(0x1);
    address private userB = address(0x2);

    function setUp() public {
        vm.deal(userA, 1000 ether);
        vm.deal(userB, 1000 ether);
    }

    function testDeployment() public {
        // agence = new Agence();
        // assertEq(agence.votingToken().totalSupply(), 1000 ether);
        // assertEq(agence.stakingToken().totalSupply(), 1000 ether);
        // assertEq(agence.rewardsToken().totalSupply(), 1000 ether);
    }
}
