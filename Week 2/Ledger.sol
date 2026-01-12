// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract Ledger{

    event AmountDeposited();
    address[] public depositers;
    mapping(address depositer => uint256 amount) public addressToAmount;

    function deposit() public{
        depositers.push(msg.sender);
        addressToAmount[msg.sender] += msg.value;
    }

}
