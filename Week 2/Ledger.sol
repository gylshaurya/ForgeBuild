// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Ledger{
    address[] public depositers;
    mapping(address depositer => uint256 amount) public addressToAmount;

    function deposit() public payable{
        depositers.push(msg.sender);
        addressToAmount[msg.sender] += msg.value;
    }
}