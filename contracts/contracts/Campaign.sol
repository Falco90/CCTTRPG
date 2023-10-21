// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Campaign is Ownable {
    mapping(string => Item) public itemLibrary;
    mapping(address => mapping(string => uint256)) characterAttributes;
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
        Role role;
        address contractAddress;
        uint256 tokenId;
    }

    enum ItemType {
        Equipment,
        Book,
        Other
    }

    enum Role {
        Fighter,
        Wizard,
        Rogue,
        Cleric,
        Ranger
    }

    struct Attribute {
        string name;
        uint256 value;
    }

    event CharacterCreated(string name, string role);
    event AbilityCheck(
        string name,
        string attribute,
        uint256 roll,
        bool result
    );
    event LevelUp(
        string name,
        uint256 level,
        string attribute1,
        uint256 value1,
        string attribute2,
        uint256 value2,
        string attribute3,
        uint256 value3
    );

    constructor(address initialOwner) Ownable(initialOwner) {}

    function getCharacterAttribute(address character, string memory attribute)
        public
        view
        returns (uint256)
    {
        return characterAttributes[character][attribute];
    }

    function getCharacterAvatar(address character) public view returns (Avatar memory) {
        return characterAvatars[character];
    }
    function getCharacterInventory(address character) public view returns (Inventory memory) {
        return characterInventories[character];
    }

    function createCharacter(
        string memory name,
        uint256 roleId,
        address contractAddress,
        uint256 tokenId,
        uint256 _strength,
        uint256 _intelligence,
        uint256 _dexterity,
        uint256 _constitution,
        uint256 _charisma
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

        if (roleId == 0) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Role.Fighter,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Fighter");
        } else if (roleId == 1) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Role.Wizard,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Wizard");
        } else if (roleId == 2) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Role.Rogue,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Rogue");
        } else if (roleId == 3) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Role.Cleric,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Cleric");
        } else if (roleId == 4) {
            characterAvatars[msg.sender] = Avatar(
                name,
                Role.Ranger,
                contractAddress,
                tokenId
            );
            emit CharacterCreated(name, "Ranger");
        }
    }

    function createItem(
        string memory name,
        uint256 kind,
        string memory cid
    ) public onlyOwner {
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

    function abilityCheck(address character, string memory attribute, uint256 difficulty)
        public
        onlyOwner
        returns (bool)
    {
        uint256 roll = rollD20();
        bool result = roll + characterAttributes[character][attribute] >=
            difficulty;
        emit AbilityCheck(
            characterAvatars[msg.sender].name,
            attribute,
            roll,
            result
        );
        return result;
    }

    function rollD20() public view returns (uint256) {
        uint256 randomValue = (uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
            )
        ) % 20) + 1;
        return randomValue;
    }

    function updateAttribute(
        address character,
        string memory attribute,
        uint256 value
    ) public onlyOwner {
        characterAttributes[character][attribute] += value;
    }

    function levelUp(address character) public onlyOwner {
        characterAttributes[character]["level"] += 1;
        string memory name = characterAvatars[character].name;
        Role role = characterAvatars[character].role;
        uint256 level = characterAttributes[character]["level"];

        if (role == Role.Fighter) {
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
        } else if (role == Role.Wizard) {
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
        } else if (role == Role.Rogue) {
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
        } else if (role == Role.Cleric) {
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
        } else if (role == Role.Ranger) {
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

    function giveItem(address character, string memory itemName)
        public
        onlyOwner
    {
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
