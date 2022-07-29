const hre = require("hardhat")
const { fundConfig } = require("../helper.config");

async function main() {
	let usdcTokenAddress;
	if (hre.network.config.chainId == 31337) {
		// Deploying on localhost...
		// Deploy the Mock USDCStablecoin contract
		const usdcTokenContractFactory = await hre.ethers.getContractFactory("USDCStablecoin");
		usdcTokenContract = await usdcTokenContractFactory.deploy();
		await usdcTokenContract.deployed();
		console.log("MockUSDCStablecoin contract deployed to:", usdcTokenContract.address);
		usdcTokenAddress = usdcTokenContract.address;
	} else {
		// Retrieve USDC Address from Goerli
		const chainId = hre.network.config.chainId;
		usdcTokenAddress = fundConfig.network[chainId].usdcTokenAddress;
	}
    console.log(usdcTokenAddress)
    const Fund = await hre.ethers.getContractFactory("Fund");
	const fund = await Fund.deploy(usdcTokenAddress);
    console.log('here')
    await fund.deployed();

	console.log("Fund deployed to:", fund.address);

    // Verify the contract
    if (hre.network.config.chainId == 31337) {
        await fund.deployTransaction.wait(6);
        await hre.run("verify:verify", {
            address: fund.address,
            constructorArguments: [usdcTokenAddress]
        });
    }
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
