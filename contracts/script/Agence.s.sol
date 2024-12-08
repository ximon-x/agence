// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Agence} from "../src/Agence.sol";

contract AgenceScript is Script {
    Agence private mainAgence; // Main Agence Deployment
    Agence private sideAgence; // Side Agence Deployment

    // Base Sepolia Endpoint ID
    uint32 mainEid = 30184;

    // Avalanche Fuji Endpoint ID
    uint32 sideEid = 40106;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        vm.stopBroadcast();
    }

    function addressToBytes32(address _addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }
}
