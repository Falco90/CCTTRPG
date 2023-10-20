// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Campaign is Ownable {
    mapping(string => Item) public itemLibrary;
    mapping(address => mapping(string => uint)) characterAttributes;
    mapping(address => Item) characterItems;
    mapping(address => Avatar) characterAvatars;
    mapping(address => Inventory) characterInventories;

    struct Item {
        string name;
        ItemType itemType;
        string cid;
    }

    struct Inventory {
        Item[] items;
        Item[] equipment;
    }

    struct Avatar {
        string name;
        Class class;
        address contractAddress;
        uint tokenId;
    }

    enum ItemType {
        Equipment,
        Book,
        Other
    }

    enum Class {
        Fighter,
        Wizard,
        Rogue,
        Cleric,
        Ranger
    }

    event CharacterCreated(string name, string class);
    event AbilityCheck(string name, string attribute, uint roll, bool result);
    event LevelUp(
        string name,
        uint level,
        string stat1,
        uint value1,
        string stat2,
        uint value2,
        string stat3,
        uint value3
    );

    constructor(address initialOwner) {}
    
    modifier OnlyAvatarOwner() {
        // Only the owner of the Avatar(ERC721 on L1) can call functions with this modifier
        // Read from L1 contract through Axelar / Scroll Messenger
        // require(assetOwner == msg.sender)
        _;
    }

    function createCharacter(
        string memory name,
        uint classId,
        address contractAddress,
        uint tokenId,
        uint _strength,
        uint _intelligence,
        uint _dexterity,
        uint _constitution,
        uint _charisma
    ) public {
        characterAttributes[msg.sender]["strength"] = _strength;
        characterAttributes[msg.sender]["intelligence"] = _intelligence;
        characterAttributes[msg.sender]["dexterity"] = _dexterity;
        characterAttributes[msg.sender]["constitution"] = _constitution;
        characterAttributes[msg.sender]["charisma"] = _charisma;
        characterAttributes[msg.sender]["health"] = 100;
        characterAttributes[msg.sender]["experience"] = 0;
        characterAttributes[msg.sender]["level"] = 1;
        characterAttributes[msg.sender]["gold"] = 0;

        if (classId == 0) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Class.Fighter,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Fighter");
        } else if (classId == 1) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Class.Wizard,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Wizard");
        } else if (classId == 2) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Class.Rogue,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Rogue");
        } else if (classId == 3) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Class.Cleric,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Cleric");
        } else if (classId == 4) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Class.Ranger,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Ranger");
        }
    }

    function createItem(
        string memory name,
        uint kind,
        string memory cid
    ) public {
        ItemType itemType;
        if (kind == 0) {
            itemType = ItemType.Equipment;
        }
        if (kind == 1) {
            itemType = ItemType.Book;
        }
        if (kind == 2) {
            itemType = ItemType.Other;
        }
        itemLibrary[name] = Item(name, itemType, cid);
    }

    function abilityCheck(string memory attribute, uint difficulty) public {
        uint roll = rollD20();
        bool result = roll + characterAttributes[msg.sender][attribute] >=
            difficulty;
        emit AbilityCheck(
            characterAvatars[msg.sender].name,
            attribute,
            roll,
            result
        );
    }

    function rollD20() public view returns (uint) {
        uint randomValue = (uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
            )
        ) % 20) + 1;
        return randomValue;
    }

    function updateAttribute(
        address character,
        string memory attribute,
        uint value
    ) public {
        characterAttributes[character][attribute] += value;
    }

    function levelUp(address character) public {
        characterAttributes[character]["level"] += 1;
        string memory name = characterAvatars[character].name;
        Class class = characterAvatars[character].class;
        uint level = characterAttributes[character]["level"];

        if (class == Class.Fighter) {
            updateAttribute(character, "strength", 1);
            updateAttribute(character, "constitution", 1);
            updateAttribute(character, "health", 30);

            emit LevelUp(
                name,
                level,
                "strength",
                1,
                "constitution",
                1,
                "health",
                30
            );
        } else if (class == Class.Wizard) {
            updateAttribute(character, "intelligence", 1);
            updateAttribute(character, "charisma", 1);
            updateAttribute(character, "health", 10);

            emit LevelUp(
                name,
                level,
                "intelligence",
                1,
                "charisma",
                1,
                "health",
                10
            );
        } else if (class == Class.Rogue) {
            updateAttribute(character, "dexterity", 1);
            updateAttribute(character, "charisma", 1);
            updateAttribute(character, "health", 20);

            emit LevelUp(
                name,
                level,
                "dexterity",
                1,
                "charisma",
                1,
                "health",
                20
            );
        } else if (class == Class.Cleric) {
            updateAttribute(character, "intelligence", 1);
            updateAttribute(character, "constitution", 1);
            updateAttribute(character, "health", 10);

            emit LevelUp(
                name,
                level,
                "intelligence",
                1,
                "constitution",
                1,
                "health",
                10
            );
        } else if (class == Class.Ranger) {
            updateAttribute(character, "dexterity", 1);
            updateAttribute(character, "constitution", 1);
            updateAttribute(character, "health", 20);

            emit LevelUp(
                name,
                level,
                "dexterity",
                1,
                "constitution",
                1,
                "health",
                20
            );
        }
    }

    function giveItem(address character, string memory itemName) public {
        Item memory item = itemLibrary[itemName];
        if (item.itemType == ItemType.Equipment) {
            Item[] storage equipment = characterInventories[character]
                .equipment;
            equipment.push();
            equipment[equipment.length - 1] = item;
        } else {
            Item[] storage items = characterInventories[character].items;
            items.push();
            items[items.length - 1] = item;
        }
    }
}
