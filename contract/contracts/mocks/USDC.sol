// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

/**
 * @title Mock USDC token contract.
 * @dev Developers can use this to test their contracts.
 * @author The Everest team: https://github.com/Everest-Option-Exchange-Team.
 */
contract USDCToken {
    // Token parameters.
    string public constant NAME = "USDCStableCoin";
    string public constant SYMBOL = "USDC";
    uint8 public constant DECIMALS = 18;

    // Users parameters.
    mapping(address => uint256) public addressToBalance;
    mapping(address => mapping(address => uint256)) public addressToAllowance;
    uint256 public totalSupply_;

    // Access-control parameters.
    address public owner;

    // Events
    event Approval(address indexed tokenOwnerAddress, address indexed spenderAddress, uint256 amount);
    event Transfer(address indexed senderAddress, address indexed receiverAddress, uint256 amount);

    constructor(uint256 _total) {
        owner = msg.sender;
        addressToBalance[msg.sender] = _total;
        totalSupply_ = _total;
    }

    function balanceOf(address _userAddress) public view returns (uint) {
        return addressToBalance[_userAddress];
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function transfer(address _receiverAddress, uint _amount) public returns (bool) {
        require(_amount >= 0, "Insufficent Amount");
        require(_amount <= addressToBalance[msg.sender], "Amount higher than balance");

        addressToBalance[msg.sender] -= _amount;
        addressToBalance[_receiverAddress] += _amount;
        emit Transfer(msg.sender, _receiverAddress, _amount);

        return true;
    }

    function approve(address _delegateAddress, uint _amount) public returns (bool) {
        require(_delegateAddress != address(0), "zero address is not allowed");
        require(_amount >= 0, "amount should be non negative");

        addressToAllowance[msg.sender][_delegateAddress] = _amount;
        emit Approval(msg.sender, _delegateAddress, _amount);

        return true;
    }

    function allowance(address _ownerAddress, address _delegateAddress) public view returns (uint) {
        return addressToAllowance[_ownerAddress][_delegateAddress];
    }

    function transferFrom(address _senderAddress, address _receiverAddress, uint _amount) public returns (bool) {
        require(_amount <= addressToBalance[_senderAddress], "Amount higher than balance");
        require(_amount <= addressToAllowance[_senderAddress][msg.sender], "Amount higher than allowed");

        addressToBalance[_senderAddress] -= _amount;
        addressToBalance[_receiverAddress] += _amount;
        addressToAllowance[_senderAddress][msg.sender] -= _amount;
        emit Transfer(_senderAddress, _receiverAddress, _amount);
        
        return true;
    }
}