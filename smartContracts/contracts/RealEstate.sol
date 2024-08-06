// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
   using Counters for Counters.Counter; // connects/attach Counters lib function to Counters.Counter, which is a data type
   Counters.Counter private _tokenIds;

   function mintNewToken(address _receiver, string memory tokenUri) public returns(uint) {
        _tokenIds.increment();
        uint newId = _tokenIds.current();
        _mint(_receiver, newId);
        // this mints a new token with an uint id
        return newId;
   }
}