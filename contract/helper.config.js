const hre = require("hardhat");

// Parameters used to deploy the Fund smart contract.
const fundConfig = {
    // Network-specific parameters.
    network: {
        5: { // Goerli testnet.
            usdcTokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        },
    },
};

module.exports = {
    fundConfig
}