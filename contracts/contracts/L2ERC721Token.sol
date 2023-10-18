// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import {IScrollERC721} from "@scroll-tech/contracts/libraries/token/IScrollERC721.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract L2ERC721Token is ERC721, IScrollERC721 {
    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Gateway address
    address public _gateway;

    // Counterpart address
    address public _counterpart;

    mapping(uint256 tokenId => address) private _owners;

    mapping(address owner => uint256) private _balances;

    mapping(uint256 tokenId => address) private _tokenApprovals;

    mapping(address owner => mapping(address operator => bool))
        private _operatorApprovals;

    constructor(
        string memory name_,
        string memory symbol_,
        address gateway_,
        address counterpart_
    ) {
        _gateway = gateway_;
        _counterpart = counterpart_;
        _name = name_;
        _symbol = symbol_;
    }

    /// @notice Mint some token to recipient's account.
    /// @dev Gateway Utilities, only gateway contract can call
    /// @param _to The address of recipient.
    /// @param _tokenId The token id to mint.
    function mint(address _to, uint256 _tokenId) external {}

    /// @notice Burn some token from account.
    /// @dev Gateway Utilities, only gateway contract can call
    /// @param _tokenId The token id to burn.
    function burn(uint256 _tokenId) external {}
}
