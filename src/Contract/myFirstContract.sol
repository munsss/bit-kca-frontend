// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    // declaring the state variables
        uint256 number;
        string public message;

    // Constructors
    constructor(uint256 startingPoint, string memory startingMessage ) {
        number = startingPoint;
        message = startingMessage;
    }

    // reading function
    function getNumber() external view returns (uint256) {
        return number;
    }
    //writing functions
    // Function to increment the number by 1
    function increaseNumber() external {
        number ++;
    }

// Function to decrease the number by 1
    function decreaseNumber() external {
        number --;
    }

    // Function to update the message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}