// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

interface IERC721 {
    function transferFrom(
        address _address,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {
    address public lender;
    address public inspector;
    address payable public seller;
    address public nftAddress;

    constructor(address _lender, address _inspector, address payable _seller, address _nftAddress) {
         nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }
}