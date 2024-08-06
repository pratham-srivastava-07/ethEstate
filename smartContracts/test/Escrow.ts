import {ethers} from "hardhat"

import expect from "chai"

function tokens(n: any) {
  return ethers.parseUnits(n.toString(), 'ethers');  // conversion of currency to tokens
}

describe('Escrow', () => {
  it('returns the nftAddress', async () => {
    const RealEstate = await ethers.getContractFactory('RealEstate')
    const realEstate = await RealEstate.deploy()


    console.log(realEstate);
    
  })
})