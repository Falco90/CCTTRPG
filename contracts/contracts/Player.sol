// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Player {
    mapping(bytes => Character) characters;

    struct Character {
       Attributes attributes;
       Avatar avatar;
       Inventory inventory;
    }

    struct Attributes {
        uint strength;
        uint intelligence;
        uint dexterity;
        uint charisma;
        uint constitution;
    }

    struct Inventory {
        string[] items;
        string[] equipment;
    }

    struct Avatar {
        address contractAddress;
        uint tokenId;
    }

    function createCharacter(Avatar calldata _avatar, Attributes calldata _attributes) public {
        bytes memory id = abi.encodePacked(_avatar.contractAddress, _avatar.tokenId);
        
        Inventory memory inventory;
        characters[id] = Character(_attributes, _avatar, inventory);
    }

    function abilityCheck(Attributes calldata _attributes) public {
        
    }
}