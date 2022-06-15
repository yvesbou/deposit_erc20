const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Fund = await ethers.getContractFactory("Fund");
    const fund = await Fund.deploy();
    await fund.deployed();
    
    
  });
});
