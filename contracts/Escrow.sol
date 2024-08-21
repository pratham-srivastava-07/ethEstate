//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 { // interacting with another contract that implements the IERC721 interface.
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external; //meaning that it can be called from outside the contract that implements this interface.
}

contract Escrow {

    mapping (uint => bool) public isListed;
    mapping (uint => uint) public purchasePrice;
    mapping (uint => uint) public escrowAmount;
    mapping (uint => address) public buyer;

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

    modifier onlyOwner {
        require(msg.sender == seller, "only owner of NFT can call this function");
        _;
    }
    modifier onlyBuyer(uint _nftID) {
        require(msg.sender == buyer[_nftID], "only buyer of NFT can call this function");
        _;
    }

    function listProperty(uint _nftId, uint _purchasePrice, address _buyer, uint _escrowAmount) public payable onlyOwner {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);  // making an external call to the transferFrom function of the contract at nftAddress
        isListed[_nftId] = true;
        purchasePrice[_nftId] = _purchasePrice;
        escrowAmount[_nftId] = _escrowAmount;
        buyer[_nftId] = _buyer;
    }

    function depositMoney(uint _nftID) public payable onlyBuyer(_nftID) {
        require(msg.value == escrowAmount[_nftID], "Not enough ethers");
    }

    receive() external payable {}

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}
