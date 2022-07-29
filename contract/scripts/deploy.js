// const { ethers } = require("hardhat");
const hre = require("hardhat")
const { fundConfig } = require("../helper.config");

async function main() {
	let usdcTokenAddress;
    console.log(hre.network.config.chainId)

	if (hre.network.config.chainId == 31337) {
		// deploying on localhost so we deploy the mock contracts.

		// Deploy the MockUsdcToken contract.
		const usdcTokenContractFactory = await hre.ethers.getContractFactory("USDCStablecoin");
        // const totalSupplyUSDC = ethers.utils.parseEther("10000");
		usdcTokenContract = await usdcTokenContractFactory.deploy();
        console.log('here')
		await usdcTokenContract.deployed();
		console.log("MockUSDCStablecoin contract deployed to:", usdcTokenContract.address);
		usdcTokenAddress = usdcTokenContract.address;
	} else {
		// Retrieve network-specific parameters.
		const chainId = hre.network.config.chainId;
        consolge.log(chainId);
		usdcTokenAddress = fundConfig.network[chainId].usdcTokenAddress;
	}

    const Fund = await ethers.getContractFactory("Fund");
	const fund = await Fund.deploy(usdcTokenAddress);

    await fund.deployed();

	console.log("Fund deployed to:", fund.address);

    // Verify the contract.
	console.log(`Verify with: $ npx hardhat verify ${fund.address} ${usdcTokenAddress} --contract contracts/Fund.sol:Fund --network ${hre.network.name}`);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
