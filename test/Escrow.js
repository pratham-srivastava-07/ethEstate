const { expect } = require('chai');
const { ethers } = require('hardhat');

function tokens(n) {
  return ethers.parseUnits(n.toString(), 'ethers');  // conversion of currency to tokens
}

describe('Escrow', () => {
  let buyer, seller, inspector, lender;
  let realEstate, escrow;

  beforeEach(async() => {
    [buyer, seller, inspector, lender] = await ethers.getSigners()  // accounts for diff parties like inspector lender
    const RealEstate = await ethers.getContractFactory('RealEstate');
    realEstate = await RealEstate.deploy(); // deploys nft on blockchain, basically NFT contract


    let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
    await transaction.wait()

    const Escrow = await ethers.getContractFactory('Escrow')
    escrow = await Escrow.deploy(
        realEstate.address,
        seller.address,
        inspector.address,
        lender.address
    )
  })

  describe('Deployement', () => {
    
    it('returns seller', async() => {
      const result = await escrow.seller();
      expect(result).to.be.equal(seller.address);
    })

    it('returns inspector', async() => {
      const result =  await escrow.inspector();
      expect(result).to.be.equal(inspector.address);
    })

    it('returns lender', async() => {
      const result = await escrow.lender();
      expect(result).to.be.equal(lender.address);
    })

    it("returns nft address ", async () => {
      const result = await escrow.nftAddress();
      expect(result).to.be.equal(realEstate.address);
    })

  })


})