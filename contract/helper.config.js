// Parameters used to deploy the Fund smart contract.
const fundConfig = {
	// Network-specific parameters.
	network: {
		5: {
			usdcTokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
		},
		80001: {
			usdcTokenAddress: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747"
		}
	},
};

module.exports = {
	fundConfig
};