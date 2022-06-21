
import { ethers } from "hardhat";

async function main() {

	// localhost

	const Fund = await ethers.getContractFactory("Fund");
	const fund = await Fund.deploy();

	await fund.deployed();

	console.log("Fund deployed to:", fund.address);

	// kovan
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
