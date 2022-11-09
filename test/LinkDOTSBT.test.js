const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LinkDOTSBT", function () {

  let linkdotsbt;
  let deployer, user1, user2, users;
  let URI = "https://ipfs.io/ipfs/QmdGBUUTkxND72zirsXEfKE4qXquisviofsXyirXdt1Kqb";

  beforeEach(async () => {
    // Get signers from development accounts 
    [deployer, user1, user2, ...users] = await ethers.getSigners();
    // We get the contract factory to deploy the contract
    const LinkDOTSBTFactory = await ethers.getContractFactory("LinkDOTSBT");
    // Deploy contract
    linkdotsbt = await LinkDOTSBTFactory.deploy();
  })

  describe('Deployment', () => {
    it("Should track name and symbol", async function () {
      const linkDOTSBTName = "LinkDOTSBT"
      const linkDOTSBTSymbol = "LDOTSBT"
      expect(await linkdotsbt.name()).to.equal(linkDOTSBTName);
      expect(await linkdotsbt.symbol()).to.equal(linkDOTSBTSymbol);
    });
  })

  describe('Issuing LinkDOTSBT NFTs', () => {
    it("Should track each issued NFT", async function () {
  
    await linkdotsbt.issueDegree(user1.address);
    expect(await linkdotsbt.issuedDegrees(user1.address)).to.equal(true);
    await linkdotsbt.connect(user1).claimDegree(URI);
    expect(await linkdotsbt.checkDegreeOfPerson(user1.address)).to.equal(URI);
    expect(await linkdotsbt.balanceOf(user1.address)).to.equal(1);
    expect(await linkdotsbt.tokenURI(1)).to.equal(URI);
    expect(await linkdotsbt.ownerOf(1)).to.equal(user1.address);
    expect(await linkdotsbt.issuedDegrees(user1.address)).to.equal(false);
    // FAIL CASES
    await expect (linkdotsbt.connect(user1).issueDegree(user1.address)).to.be.revertedWith("Only owner can issue SBTs");
    await expect (linkdotsbt.connect(user2).claimDegree(URI)).to.be.revertedWith("Degree is not issued or already claimed");
    });
  })
})