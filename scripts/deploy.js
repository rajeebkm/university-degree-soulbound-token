const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const [deployer, user1] = await ethers.getSigners();
   // We get the contract factory to deploy
   const LinkDOTSBTFactory = await ethers.getContractFactory("LinkDOTSBT");
   // Deploy contract
   const linkdotsbt = await LinkDOTSBTFactory.deploy();
   // Save contract address file in project
   const contractsDir2 = __dirname + "/../src/contractsData";
   if (!fs.existsSync(contractsDir2)) {
     fs.mkdirSync(contractsDir2);
   }
 
   fs.writeFileSync(
     contractsDir2 + `/linkdotsbt-address.json`,
     JSON.stringify({ address: linkdotsbt.address }, undefined, 2)
   );
 
   const contractArtifact2 = artifacts.readArtifactSync("LinkDOTSBT");
 
   fs.writeFileSync(
     contractsDir2 + `/linkdotsbt.json`,
     JSON.stringify(contractArtifact2, null, 2)
   );
   console.log("LinkDOTSBT deployed to:", linkdotsbt.address);
 }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
