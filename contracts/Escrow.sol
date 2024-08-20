//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {

    mapping (address => uint) property;


    address public lender; 
    address public inspector; 
    address public nftAddress; 
    address payable public seller;

    constructor(
        address _nftAddress,
        address payable _seller,
        address _inspector,
        address _lender
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    struct Property {
        string name;
        uint price;
    }

    Property[] public properties;

    function listProperty(uint _nftId) public {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);
    }
}
