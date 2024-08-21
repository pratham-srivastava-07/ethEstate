const { expect } = require('chai');
const { ethers } = require('hardhat');

function tokens(n) {
  return ethers.utils.parseUnits(n.toString(), 'ether');  // ether => wei
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
    // approve from seller whi;e taking out nft from wallet
    transaction = await realEstate.connect(seller).approve(escrow.address, 1);
    await transaction.wait()

    // list that to escrow
    transaction = await escrow.connect(seller).listProperty(1, tokens(10), buyer.address, tokens(5));
    await transaction.wait();
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

  describe('Listing', () => {
    
    it('lists property from wallet to escrow contract', async() => {
      expect(await realEstate.ownerOf(1)).to.be.equal(escrow.address);
    })

    it('updates as listed', async () => {
      const res = await escrow.isListed(1);
      expect(res).to.be.equal(true);
    })

    it('returns purchasePrice', async ()=> {
      const result = await escrow.purchasePrice(1);
      expect(result).to.be.equal(tokens(10));
    })

    it('returns buyer address', async () => {
      const res = await escrow.buyer(1);
      expect(res).to.be.equal(buyer.address);
    })

    it('returns escrowAmount', async () => {
      const res = await escrow.escrowAmount(1);
      expect(res).to.be.equal(tokens(5));
    })
  })

  describe('Balances', () => {
    it('returns balance deposited', async () => {
      let transaction = await escrow.connect(buyer).depositMoney(1, {value: tokens(5)});
      await transaction.wait();
      const res = await escrow.getBalance();
      expect(res).to.be.equal(tokens(5));
    })
  })

  describe('Inspection', () => {
    it('returns inspected amount', async () => {
      let transaction = await escrow.connect(inspector).inspectionStatus(1, true);
      await transaction.wait();
      const res = await escrow.status(1);
      expect(res).to.be.equal(true);
    })
  })

  describe('Approval', () => {
    it('returns approval status', async () => {
      let transaction = await escrow.connect(seller).getApproval(1);
      await transaction.wait();

      transaction = await escrow.connect(buyer).getApproval(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).getApproval(1);
      await transaction.wait();

      expect(await escrow.approval(1, seller.address)).to.be.equal(true);
      expect(await escrow.approval(1, buyer.address)).to.be.equal(true);
      expect(await escrow.approval(1, lender.address)).to.be.equal(true);
    })
  })
})