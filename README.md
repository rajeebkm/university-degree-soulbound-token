# university degree soulbound token

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ipfs](https://ipfs.io/) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/), (npm install --save-dev hardhat)
- Instal[MetaMask](https://metamask.io/), Install MetaMask Chrome browser extension.

## Setting Up
### 1. Clone/Download the Repository

git clone https://github.com/rajeebkm/university-degree-soulboundtoken.git

### 2. Install Dependencies:
```
$ cd university-degree-soulboundtoken
$ npm install
```
### 3. Boot up local development blockchain
```
$ cd university-degree-soulboundtoken
$ npx hardhat node
```

### 4. Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  

### 5. Run Tests
`$ npx hardhat compile`

### 6. Run deploy script to migrate smart contracts
`$ npx hardhat run scripts/deploy.js --network localhost`

### 7. Run Tests
`$ npx hardhat test`

### 8. Hardhat Console
`$ npx hardhat console --network localhost`

### 8. Launch Frontend
`$ npm run start`

License
----
MIT
