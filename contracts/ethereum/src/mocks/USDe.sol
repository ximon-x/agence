// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDe is ERC20 {
    constructor(uint256 initialSupply, address creator) ERC20("Mock sUSDe", "sUSDe") {
        _mint(creator, initialSupply);
    }
}
