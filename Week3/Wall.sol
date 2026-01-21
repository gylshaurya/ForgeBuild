// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wall {

    struct Entry {
        address user;
        string message;
        uint256 time;
    }

    Entry[] public wall;

    function post(string calldata _message) external {
        wall.push(Entry({user: msg.sender, message: _message, time: block.timestamp}));
    }

    function getCount() external view returns (uint256) {
        return wall.length;
    } 
}
