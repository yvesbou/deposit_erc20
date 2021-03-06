const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fund Contract Tests", () => {
	// eslint-disable-next-line no-unused-vars
	let USDCContract, fund, owner, user;

	beforeEach(async () => {
    
		// setting up testing accounts
		[owner, user] = await ethers.getSigners();

		// setup USDC contract
		const USDCStablecoinFactory = await ethers.getContractFactory("USDCStablecoin");
		USDCContract = await USDCStablecoinFactory.deploy();
		await USDCContract.deployed();

		// setup the Fund contract
		const FundTokenFactory = await ethers.getContractFactory("Fund");
		fund = await FundTokenFactory.deploy(USDCContract.address);
		await fund.deployed();
	});

	describe("Deposit", () => {

		it("The User should be allowed to deposit available USDC", async () => {

			// setup user USDC balance for interaction with contract
			let balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(0);
      
			let txn = await USDCContract.transfer(user.address, ethers.utils.parseEther("5")); // user1 received 5 USDC
			await txn.wait();
      
			balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(ethers.utils.parseEther("5"));
      
			// User deposits 5 USDC (first approval, then deposit to contract)
			txn = await USDCContract.connect(user).approve(fund.address, ethers.utils.parseEther("5"));
			await txn.wait();
      
			txn = await fund.connect(user).deposit(ethers.utils.parseEther("5"));
			await txn.wait();
      
			// funders and addressToFunds are the default getters solidity is generatings for us
			let amountFunded = await fund.addressToFunds(user.address);
			let funderAddress = await fund.funders(0); 

			// user is now part of the funders
			expect(funderAddress).to.equal(user.address);
      
			// user has deposited 5 USDC
			expect(amountFunded).to.equal(ethers.utils.parseEther("5"));
      
		});

    
		it("The amount to deposit should be larger than 0", async () => {
			let txn = await USDCContract.connect(user).approve(fund.address, ethers.utils.parseEther("5"));
			await txn.wait();
			let amountToBeDeposited = ethers.utils.parseEther("0");
			await expect(fund.connect(user).deposit(amountToBeDeposited)).to.be.revertedWith(`InsufficientAmount(${amountToBeDeposited})`);

		});

		it("The USDC balance of user should be greater than amount to be deposited", async () => {
			// user balance is 0
			let userBalance = await USDCContract.balanceOf(user.address);
			expect(userBalance).to.equal(0);

			let amount = ethers.utils.parseEther("5");

			// User approves 5 USDC (first approval, then deposit to contract)
			let txn = await USDCContract.connect(user).approve(fund.address, amount);
			await txn.wait();

			await expect(fund.connect(user).deposit(amount)).to.be.revertedWith(`InsufficientBalance(${userBalance}, ${amount})`);

		});

		it("Transaction should fail, if not approved", async () => {
			// setup user USDC balance for interaction with contract
			let balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(0);
      
			let txn = await USDCContract.transfer(user.address, ethers.utils.parseEther("5")); // user1 received 5 USDC
			await txn.wait();
      
			balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(ethers.utils.parseEther("5"));

			expect(fund.connect(user).deposit(ethers.utils.parseEther("5"))).to.be.revertedWith("ERC20: insufficient allowance");
			
		});

	});

	describe("Withdraw", () => {
		
		it("The User should be allowed to withdraw the deposited amount", async () => {

			// setup user USDC balance for interaction with the contract
			let balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(0);
      
			let txn = await USDCContract.transfer(user.address, ethers.utils.parseEther("5")); // user1 received 5 USDC
			await txn.wait();
      
			balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(ethers.utils.parseEther("5"));

			// User deposits 5 USDC (first approval, then deposit to contract)
			txn = await USDCContract.connect(user).approve(fund.address, ethers.utils.parseEther("5"));
			await txn.wait();
      
			txn = await fund.connect(user).deposit(ethers.utils.parseEther("5"));
			await txn.wait();
      
			// funders and addressToFunds are the default getters solidity is generatings for us
			let amountFunded = await fund.addressToFunds(user.address);
			let funderAddress = await fund.funders(0); 

			// user is now part of the funders
			expect(funderAddress).to.equal(user.address);
      
			// user has deposited 5 USDC
			expect(amountFunded).to.equal(ethers.utils.parseEther("5"));

			// withdraw
			txn = await fund.connect(user).withdraw(ethers.utils.parseEther("5"));
			await txn.wait();

			// user has deposited 0 USDC
			amountFunded = await fund.addressToFunds(user.address);
			expect(amountFunded).to.equal(ethers.utils.parseEther("0"));
		});

		it("The amount to withdraw should be greater than 0", async () => {
			let amountFunded = await fund.addressToFunds(user.address);
			expect(amountFunded).to.equal(ethers.utils.parseEther("0"));
			
			// withdraw
			let amountToBeWithdrawn = ethers.utils.parseEther("0");
			await expect(fund.connect(user).withdraw(amountToBeWithdrawn)).to.be.revertedWith(`InsufficientAmount(${amountToBeWithdrawn})`);

		});

		it("The User is not allowed to withdraw if not a funder", async () => {
			let amountFunded = await fund.addressToFunds(user.address);
			expect(amountFunded).to.equal(ethers.utils.parseEther("0"));
			
			// withdraw
			let amountToBeWithdrawn = ethers.utils.parseEther("5");
			await expect(fund.connect(user).withdraw(amountToBeWithdrawn)).to.be.revertedWith("UserNotAFunder");
			// await expect(fund.connect(user).withdraw(amountToBeWithdrawn)).to.be.revertedWith(`InsufficientBalance(${amountFunded}, ${amountToBeWithdrawn})`);
		});

		it("The user should not be allowed to withdraw more than funded", async () => {
			// setup user USDC balance for interaction with the contract
			let balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(0);
      
			let txn = await USDCContract.transfer(user.address, ethers.utils.parseEther("5")); // user1 received 5 USDC
			await txn.wait();
      
			balance = await USDCContract.balanceOf(user.address);
			expect(balance).to.equal(ethers.utils.parseEther("5"));

			// User deposits 5 USDC (first approval, then deposit to contract)
			txn = await USDCContract.connect(user).approve(fund.address, ethers.utils.parseEther("5"));
			await txn.wait();
      
			txn = await fund.connect(user).deposit(ethers.utils.parseEther("5"));
			await txn.wait();
      
			// funders and addressToFunds are the default getters solidity is generatings for us
			let amountFunded = await fund.addressToFunds(user.address);
			let funderAddress = await fund.funders(0); 

			// user is now part of the funders
			expect(funderAddress).to.equal(user.address);
      
			// user has deposited 5 USDC
			expect(amountFunded).to.equal(ethers.utils.parseEther("5"));

			// try to withdraw 10 ether
			let amountToBeWithdrawn = ethers.utils.parseEther("10");

			await expect(fund.connect(user).withdraw(amountToBeWithdrawn)).to.be.revertedWith(`InsufficientBalance(${amountFunded}, ${amountToBeWithdrawn})`);

		});
	});
});
