<div align=center>
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/logo-dark.png#gh-dark-mode-only">
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/logo-light.png#gh-light-mode-only">
</div>

---

## ⚡ Summary

Hiring is hard and getting hired is even harder. Ghost listings, scams, and spam applications make it tough for everyone. If only we had a way to mitigate this. Now we do.

Agence aims to redefine the job market by introducing a decentralized platform that connects people in a whole new way. Inspired by the _Proof of Stake Consensus Algorithm_, powered by _Base Blockchain_, enabled by _Ethena's USDe Token_, and scaled by _LayerZero_, Agence offers a fresh solution to a global problem.

## 🎯 Objective

Agence is modelled after the proof of stake consensus algorithm meaning for users to interact with the platform they must stake and lock up their USDe token in the [Agence Treasury Contract](contracts/ethereum/src/AgenceTreasury.sol) in the promise that they will not be malicious. This not only creates a safe space for other users to hire and get hired but since the staked tokens accrue the estimated 15% APY, users are rewarded for voting against malicious behavior.

Agence aims to be a one stop shop for job seekers and job providers.

## System Breakdown

<div align=center>
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/system-architecture-dark.svg#gh-dark-mode-only">
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/system-architecture-light.svg#gh-light-mode-only">
</div>

## 🛠️ Technologies

1. **Ethena's USDe Token**: Ethena's USDe token is the chosen stable coin for Agence; To create a gig, a user (agency) has to first lock a binding amount of USDe tokens for the entirety of the gig duration. This tokens is then staked

2. **LayerZero**: The Agence Token (ATK) is a LayerZero OFT token meant to enable users vote from various evm blockchains.

3. **Base Blockchain**: The primary blockchain that powers Agence.

## ✅ Features

- [x] The User Interface is up and running.
- [x] The Agence Gigs contract is completed.
- [x] The Agence Governance contract is completed.

## 🚧 Development

This project is actively being developed, Please always check back for updates as I am rushing to finish v1. These are the features I will be implementing in the coming days.

- [ ] Convert the Governace contract into a LayerZero oApp for cross chain voting.
- [ ] Update the Agence Token to be a LayerZero OFT token and use that on the UI.
- [ ] Deploy the Smart Contracts to the Base Sepolia Testnet.
- [ ] Integrate the Agence contracts into the UI and enable users to vote.
- [ ] Remove the Dummy Data from the UI.
- [ ] Update the Documentation and Reduce this README.md so I don't bore my readers. 🙃

## 📑 Addresses

Information about the smart contracts can be found in the [agence_contracts.json](client/src/lib/interfaces/algorand/agence_contracts.json) file.
