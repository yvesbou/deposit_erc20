//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Fund {
    mapping(address => uint256) public addressToFunds;
    mapping(address => bool) public addressToFundingStatus;
    address[] public funders;

    // USDC token parameters.
    address public usdcAddress;
    IERC20 public usdcContract;

    event Deposit(uint256 amount, address indexed sender);
    event NewFunder(address indexed funder);

     /// @notice Initialise the contract
     /// @param _usdcAddress address of the USDC Token Contract   
    constructor(address _usdcAddress) {
        if(_usdcAddress == address(0)) {
            revert ZeroAddressSpecified();
        }
        usdcAddress = _usdcAddress;
        usdcContract = IERC20(usdcAddress);
    }

    /// @notice Deposit USDC to the Fund Contract.
    /// @param _amount The Amount of USDC token send to the Fund.
    function deposit(uint256 _amount) external {

        // checks
        if (_amount <= 0) {
            revert InsufficientAmount({depositAmount: _amount});
        }
        uint256 userBalance = usdcContract.balanceOf(msg.sender);
        if (userBalance < _amount) {
            revert InsufficientBalance({available: userBalance, required: _amount});
        }

        // state updates and events
        addressToFunds[msg.sender] += _amount;
        emit Deposit(_amount, msg.sender);

        if (! addressToFundingStatus[msg.sender]) {
            funders.push(msg.sender);
            addressToFundingStatus[msg.sender] = true;
            emit NewFunder(msg.sender);
        }
        
        // external calls
        if (!usdcContract.transferFrom(msg.sender, address(this), _amount)){
            revert TransactionDeclined();
        }
    }

    /***********************************************************************************************
                                            Custom errors
    ***********************************************************************************************/

    /// Insufficient balance for transfer. Needed `required` but only
    /// `available` available.
    /// @param available balance available.
    /// @param required requested amount to transfer.
    error InsufficientBalance(uint256 available, uint256 required);

    /// User wanted to deposit insufficient amount
    /// @param depositAmount amount tried to deposit
    error InsufficientAmount(uint256 depositAmount);

    /// User declined transaction
    error TransactionDeclined();

    /// User didn't specify an address
    error ZeroAddressSpecified();
}