const hre = require("hardhat");

async function main() {

  const Fund = await hre.ethers.getContractFactory("Fund");
  const fund = await Fund.deploy(unlockTime, { value: lockedAmount });

  await fund.deployed();
 
  console.log(
    `Fund deployed to ${fund.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
