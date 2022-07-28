require("@nomiclabs/hardhat-waffle");

module.exports = {
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
		  url: process.env.ALCHEMY_API_KEY,
		  accounts: [process.env.GOERLI_PRIVATE_KEY],
		},
	},
	etherscan: {
	  apiKey: {
		goerli: process.env.ETHERSCAN_API_KEY
	  },
	},
};