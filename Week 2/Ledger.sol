// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Ledger{

    event AmountDeposited(address depositerId, uint256 amount);
    address[] public depositers;
    mapping(address depositer => uint256 amount) public addressToAmount;

    function deposit(uint256 amount) public{
        depositers.push(msg.sender);
        addressToAmount[msg.sender] += amount;
        emit AmountDeposited(msg.sender, addressToAmount[msg.sender]);
    }
    
}
