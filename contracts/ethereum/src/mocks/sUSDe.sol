// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract sUSDe is ERC20 {
    constructor(uint256 initialSupply, address stakingContract) ERC20("Mock sUSDe", "sUSDe") {
        _mint(stakingContract, initialSupply);
    }
}
