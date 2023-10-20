// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Campaign {
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
        string class;
        address contractAddress;
        uint tokenId;
    }

    enum ItemType {
        Equipment,
        Book,
        Other
    }

    event CharacterCreated(string name, string class);
    event AbilityCheck(string name, string attribute, uint roll, bool result);

    modifier OnlyAvatarOwner() {
        // Only the owner of the Avatar(ERC721 on L1) can call functions with this modifier
        // Read from L1 contract through Axelar / Scroll Messenger
        // require(assetOwner == msg.sender)
        _;
    }

    function createCharacter(
        Avatar memory _avatar,
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

        characterAvatars[msg.sender] = _avatar;

        emit CharacterCreated(_avatar.name, _avatar.class);
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
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
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
