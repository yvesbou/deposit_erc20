//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Fund {
    mapping(address => uint256) addressToFunds;
    mapping(address => bool) addressToFundingStatus;
    address[] funders;

    // USDC token parameters.
    address public usdcAddress;
    IERC20 public usdcContract;

    event Deposit(uint256 amount, address indexed sender);
    event NewFunder(address indexed funder);

    /**
     * @notice Initialise the contract
     * @param _usdcAddress address of the USDC Token Contract   
     */
    constructor(address _usdcAddress) {
        usdcAddress = _usdcAddress;
        usdcContract = IERC20(usdcAddress);
    }

    /**
     * @notice Deposit USDC to the Fund Contract.
     * @param _amount The Amount of USDC token send to the Fund.
     */
    function deposit(uint256 _amount) external returns(uint256) {
        require(_amount > 0, "The amount should be greater than 0");
        require(usdcContract.balanceOf(msg.sender) > 0, "The amount should be greater than 0");
        require(usdcContract.transferFrom(msg.sender, address(this), _amount), "Transaction declined");

        addressToFunds[msg.sender] += _amount;
        emit Deposit(_amount, msg.sender);

        if (! addressToFundingStatus[msg.sender]) {
            funders.push(msg.sender);
            addressToFundingStatus[msg.sender] = true;
            emit NewFunder(msg.sender);
        }
    }
}

// Interfaces

interface IERC20 {
    function transfer(address receiverAddress, uint amount) external returns (bool);
    function transferFrom(address senderAddress, address receiverAddress, uint amount) external returns (bool);
    function balanceOf(address userAddress) external view returns (uint);
}