#!/bin/bash
set -e

PUBLIC_KEY=ed25519:CZqFUro8RgE2rurn3A8sqHNrKmKQWcxrLFwMsF4wpdGy

# Delete and send the funds to the beneficiary
near account delete-account agence.testnet beneficiary ximon-x.testnet network-config testnet sign-with-keychain send

# Create the account 
near account create-account sponsor-by-faucet-service agence.testnet use-manually-provided-public-key $PUBLIC_KEY network-config testnet create

# Add more money to the agence account. 
near tokens ximon-x.testnet send-near agence.testnet '10 NEAR' network-config testnet sign-with-keychain send