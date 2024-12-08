// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Agence} from "../src/Agence.sol";

contract AgenceScript is Script {
    Agence public agence;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        agence = new Agence();

        vm.stopBroadcast();
    }
}
