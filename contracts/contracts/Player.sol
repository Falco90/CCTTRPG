// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";

contract Player is AxelarExecutable {
    string public value;
    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService public immutable gasService;
    
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

    modifier OnlyAvatarOwner() {
        // Only the owner of the Avatar(ERC721 on L1) can call functions with this modifier
        // Read from L1 contract through Axelar / Scroll Messenger
        // require(assetOwner == msg.sender)
        _;
    }

    constructor(
        address gateway_,
        address gasReceiver_
    ) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    function createCharacter(
        Avatar calldata _avatar,
        Attributes calldata _attributes
    ) public {
        bytes memory id = abi.encodePacked(
            _avatar.contractAddress,
            _avatar.tokenId
        );

        Inventory memory inventory;
        characters[id] = Character(_attributes, _avatar, inventory);
    }

    function abilityCheck(Attributes calldata _attributes) public {
        // Call GameMaster contract here through Axelar
    }
}
