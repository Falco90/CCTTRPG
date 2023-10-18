// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract GameMaster {
    mapping(uint => Item) public items;

    struct Item {
        uint id;
        string name;
        string cid;
    }

    struct Attributes {
        uint strength;
        uint intelligence;
        uint dexterity;
        uint charisma;
        uint constitution;
    }

    function createItem(string calldata _name) public returns (Item memory) {}

    function abilityCheck(Attributes calldata _attributes) public {
        // use Lit action for dice roll with attributes and difficulty condition as inputs
        // if the result is true => do something, if the result is false => do something else
    }
}
