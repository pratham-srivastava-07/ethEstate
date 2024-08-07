import {ethers} from "hardhat"

import expect from "chai"

function tokens(n: any) {
  return ethers.parseUnits(n.toString(), 'ethers');  // conversion of currency to tokens
}

describe('Escrow', () => {
  let buyer, seller, inspector, lender;
  let realEstate;
  it('returns the nftAddress', async () => {
    
    [buyer, seller, inspector, lender] =  await ethers.getSigners()

    const RealEstate = await ethers.getContractFactory('RealEstate')
     realEstate = await RealEstate.deploy() // deploys nft on blockchain, basically NFT contract
     
    let txn = await realEstate.connect(seller).mintNewToken("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
    // console.log(realEstate);
    await txn.wait(); // minted a single property
    
    const Escrow = await ethers.getContractFactory('Escrow');
    const escrowContract = await Escrow.deploy(realEstate.address, seller.address, lender.address, inspector.address)
  })
})