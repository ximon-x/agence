# Agence

The hiring process shouldn't be difficult, Agence is here to fix this by utilizing the power of the Algorand Blockchain and the Proof of Stake algorithm.

We're able to provide a solution to scams, shams and spams in the job market.

## Brief Overview

The project is divided by directories and here is a brief overview of the files:

1. Contracts:
   In here we will have the smart contracts for the project. There are split into 3 directories:

   1. Staking - The smart contract for the staking system.
   2. Gigs - The smart contract for the gig system.
   3. Governance - The smart contract for the governance system.

   Here are the tools used:

   1. Algopy
   2. Python
   3. AlgoKit
   4. Algorand

2. Client:
   Here are the tools used:

   1. TypeScript
   2. Next.js
   3. Supabase
   4. ShadCN
   5. MagicUI

3. Server:
   1. Go
   2. Fibre
   3. Gorm

## How to Run

### Contracts

To build the smart contracts use the following command:

```bash
cd contracts/algorand

algokit project run build
```

To deploy the smart contracts use the following command:

```bash
algokit project deploy testnet
```

### Client

To build the client use the following command:

```bash
cd client

npm install
npm run build
```

### Server

To build the server use the following command:

```bash
cd server

air
```

## Achievements

1. Presently the Gig and Staking smart contracts have been built and deployed to the testnet.
2. Authentication has been implemented in the client and server.
3. The Governance contract is still in development and but is deployed.
4. The smart contracts have yet to be hooked up to the client.

## Addresses

Information about the smart contracts can be found in the [agence_contracts.json](client/src/lib/interfaces/algorand/agence_contracts.json) file.
