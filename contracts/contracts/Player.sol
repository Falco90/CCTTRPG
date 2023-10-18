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

    modifier OnlyAvatarOwner {
        // Only the owner of the Avatar(ERC721 on L1) can call functions with this modifier
        // Read from L1 contract through Axelar / Scroll Messenger
        // require(assetOwner == msg.sender)
        _;
    }

    function createCharacter(Avatar calldata _avatar, Attributes calldata _attributes) public {
        bytes memory id = abi.encodePacked(_avatar.contractAddress, _avatar.tokenId);
        
        Inventory memory inventory;
        characters[id] = Character(_attributes, _avatar, inventory);
    }

    function abilityCheck(Attributes calldata _attributes) public {
        // Call GameMaster contract here through Axelar
    }
}