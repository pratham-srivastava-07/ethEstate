import {ethers} from "hardhat"

import {expect} from "chai"


function tokens(n: any) {
  return ethers.parseUnits(n.toString(), 'ethers');  // conversion of currency to tokens
}

describe('Escrow', () => {
  let buyer, seller, inspector, lender;
  let realEstate: any, escrow: any;

  it("returns nft address ", async () => {
    
    [buyer, seller, inspector, lender] = await ethers.getSigners()
    const RealEstate = await ethers.getContractFactory('RealEstate');
    realEstate = await RealEstate.deploy(); // deploys nft on blockchain, basically NFT contract

    // console.log(realEstate.address);

    let transaction = await realEstate.connect(seller).mintNewToken("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
    await transaction.wait()

    const Escrow = await ethers.getContractFactory('Escrow')
    escrow = await Escrow.deploy(
        realEstate.address,
        seller.address,
        inspector.address,
        lender.address
    )
    // const result = await escrow.nftAddress();
    // // expect(result).to.be.equal(realEstate.address)
    // const result = await escrow.seller();
    // expect(result).to.be.equal(seller.address)
  })

})