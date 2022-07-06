# Smart Contracts

This Project uses, ESlint, Solhint, Hardhat, Slither and Mythril.

Try running some of the following tasks inside `contract` folder:

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

# need to specify paths because of virtual environment, otherwise run just myth analyze contracts/Fund.sol
python3 venv_audit-tools/bin/myth analyze contracts/Fund.sol

# for more verbosity run going from -v0 (default) to -v5
python3 venv_audit-tools/bin/myth -v4 analyze contracts/Fund.sol

```

## How to install slither for this project

Create a virtual environment for python and install slither. Make sure to add the python virtual env to gitignore
```shell
python3 -m venv venv_audit-tools
cd venv_audit-tools
source bin/activate
pip3 install slither-analyzer
```

## Slither Resources
- https://github.com/crytic/slither#how-to-install
- https://github.com/marketplace/actions/slither-action
- https://github.com/crytic/slither/wiki/Usage

## How to install mythril
Following this 👇 Make sure to still work inside the python virtual environment.
https://mythril-classic.readthedocs.io/en/master/installation.html

### PyPI on Mac OS
```shell
brew update
brew upgrade
brew tap ethereum/ethereum
brew install leveldb
brew install solidity
pip3 install mythril
```

### PyPI on Ubuntu
```shell
# Update
sudo apt update

# Install solc
sudo apt install software-properties-common
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt install solc

# Install libssl-dev, python3-dev, and python3-pip
sudo apt install libssl-dev python3-dev python3-pip

# Install mythril
pip3 install mythril
myth --version
```

## Add remappings.json
As mentioned in this issue https://github.com/ConsenSys/mythril/issues/1478#issuecomment-897462501. The solc binary and thus also myth do not know the location of @openzepplin. You have to map this to explicit path to the imported contract. You can create file with remappings(I created in project directory) with this content:

```json
{   
    "remappings": [ "@openzeppelin/=node_modules/@openzeppelin/" ]
}
```