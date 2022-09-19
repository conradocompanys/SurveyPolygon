# Create a Web3 Survey with Polygon

###  Details

This a final project for BSM WEB 3 course certification

### Overview

npx install

### Config PRIVATE_KEY

Create file .env 
PRIVATE_KEY=

### Run HardHat

npx hardhat node 

### Deploy Contracts on Mumbai Matic Testnet

npx hardhat run scripts/deploy-and-seed.js --network matic

get the deployed survey contract address

modify view.js adding contract deployed address
const survey = await Survey.attach(
 "0xB487A9d0a04de928eD83B9936A76E3A6dC6d20a3" // The deployed contract address
);

If the wallet you're using doesn't have any MATIC on the Polygon Mumbai network then you'll need to request some from the  https://faucet.polygon.technology/

# Run SurveyPolygon

npm run dev
