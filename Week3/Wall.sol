// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wall {

    struct Entry {
        address user;
        string message;
        uint256 time;
    }

    Entry[] public wall;
    mapping(address => bool) public hasPosted;

    function post(string calldata _message) external {
        require(!hasPosted[msg.sender], "Already posted");

        wall.push(Entry({user: msg.sender, message: _message, time: block.timestamp}));

        hasPosted[msg.sender] = true;
    }

    function getCount() external view returns (uint256) {
        return wall.length;
    } 
}
