// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @title Mock USDC token contract.
 * @dev Imitates the USDC Stable coin.
 */
contract USDCStablecoin is ERC20 {

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20("USDCStablecoin", "USDC") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}