# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix

npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix

npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test

slither .
```

## How to install slither locally

Create a virtual environment for python. Make sure to add the python virtual env to gitignore
```shell
python3 -m venv deposit_erc20-slither
cd deposit_erc20-slither
source bin/activate
pip install slither-analyzer
```