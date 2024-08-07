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

   constructor() ERC721("Real Estate", "REAL") {}

   function mintNewToken(string memory tokenURI) public returns(uint256) {
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);
        // this mints a new token with an uint id
        return newId;
   }

   function mintCount() public view returns(uint256) {
      return _tokenIds.current();   // returns nfts that are minted
   }
}