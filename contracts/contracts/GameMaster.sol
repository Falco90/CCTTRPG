// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";

contract GameMaster is AxelarExecutable {
    string public value;
    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService public immutable gasService;

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

    constructor(
        address gateway_,
        address gasReceiver_
    ) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    function createItem(string calldata _name) public returns (Item memory) {}

    function abilityCheck(Attributes calldata _attributes) public {
        // use Lit action for dice roll with attributes and difficulty condition as inputs
        // if the result is true => do something, if the result is false => do something else
    }
}
