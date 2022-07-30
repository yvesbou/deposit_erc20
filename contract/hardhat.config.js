require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
	defaultNetwork: "hardhat",
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200 }
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
	},
	networks: {
		goerli: {
			chainId: 5,
			url: process.env.GOERLI_RPC_URL,
			accounts: [process.env.GOERLI_PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: {
			goerli: process.env.ETHERSCAN_API_KEY
		},
	},
};