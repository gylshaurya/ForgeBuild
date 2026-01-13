// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Ledger{

    event AmountDeposited();
    address[] public depositers;
    mapping(address depositer => uint256 amount) public addressToAmount;
    mapping(address depositer => bool isDepositer) public addressCheck;

    function deposit(uint256 amount) public{
        if(addressCheck[msg.sender] == false){
        depositers.push(msg.sender);
        addressCheck[msg.sender]= true;
        }
        addressToAmount[msg.sender] += amount;
        emit AmountDeposited();
    }

    function getDepositers() external  view returns( address[] memory){
        return depositers;
    }
    
}
