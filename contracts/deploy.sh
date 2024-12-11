#!/bin/bash

# Load environment variables
source .env

# Function to handle errors
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

# Validate common environment variables
[[ -z "$DEPLOYER" ]] && error_exit "DEPLOYER is not set"

NETWORK_NAME=$NETWORK
RPC_URL_VAR="$(echo "$NETWORK_NAME" | tr '[:lower:]' '[:upper:]')_RPC"
ENDPOINT_VAR="$(echo "$NETWORK_NAME" | tr '[:lower:]' '[:upper:]')_ENDPOINT"
ETHERSCAN_API_KEY_VAR="$(echo "$NETWORK_NAME" | tr '[:lower:]' '[:upper:]')_EXPLORER_API_KEY"

# Validate network-specific environment variables
[[ -z "${!RPC_URL_VAR}" ]] && error_exit "${RPC_URL_VAR} is not set"
[[ -z "${!ENDPOINT_VAR}" ]] && error_exit "${ENDPOINT_VAR} is not set"
[[ -z "${!ETHERSCAN_API_KEY_VAR}" ]] && error_exit "${ETHERSCAN_API_KEY_VAR} is not set"

echo -e "\n=== Deploying to $NETWORK_NAME ==="

# Create network-specific data directory
mkdir -p "data/$NETWORK_NAME"

# Deploy Agence Contract
echo "Deploying Agence Contract..."
forge create src/Agence.sol:Agence --json \
    --rpc-url "${!RPC_URL_VAR}" \
    --account deployer --broadcast \
    --constructor-args "${!ENDPOINT_VAR}" "$DEPLOYER" \
    --etherscan-api-key "${!ETHERSCAN_API_KEY_VAR}" --verify \
    > "data/$NETWORK_NAME/agence.json" || error_exit "Agence contract deployment failed"

# Extract Agence contract address
AGENCE_ADDRESS=$(jq -r .deployedTo "./data/$NETWORK_NAME/agence.json")
echo "Agence deployed to $AGENCE_ADDRESS on $NETWORK_NAME."

# Retrieve token addresses from Agence contract
STAKING_TOKEN=$(cast call "$AGENCE_ADDRESS" \
    --rpc-url "${!RPC_URL_VAR}" \
    "getStakingTokenAddress()(address)") || error_exit "Failed to get staking token address"

REWARDS_TOKEN=$(cast call "$AGENCE_ADDRESS" \
    --rpc-url "${!RPC_URL_VAR}" \
    "getRewardsTokenAddress()(address)") || error_exit "Failed to get rewards token address"

VOTING_TOKEN=$(cast call "$AGENCE_ADDRESS" \
    --rpc-url "${!RPC_URL_VAR}" \
    "getVotingTokenAddress()(address)") || error_exit "Failed to get voting token address"

# Deploy Agence Treasury
echo "Deploying Agence Treasury..."
forge create src/AgenceTreasury.sol:AgenceTreasury --json \
    --rpc-url "${!RPC_URL_VAR}" \
    --account deployer --broadcast \
    --constructor-args "$AGENCE_ADDRESS" \
        "$STAKING_TOKEN" "$REWARDS_TOKEN" "$VOTING_TOKEN" \
    --etherscan-api-key "${!ETHERSCAN_API_KEY_VAR}" --verify \
    > "data/$NETWORK_NAME/agence_treasury.json" || error_exit "Agence Treasury deployment failed"

# Extract Agence Treasury address
AGENCE_TREASURY_ADDRESS=$(jq -r .deployedTo "./data/$NETWORK_NAME/agence_treasury.json")
echo "Agence Treasury deployed to $AGENCE_TREASURY_ADDRESS on $NETWORK_NAME."

# Deploy Agence Gigs
echo "Deploying Agence Gigs..."
forge create src/AgenceGigs.sol:AgenceGigs --json \
    --rpc-url "${!RPC_URL_VAR}" \
    --account deployer --broadcast \
    --constructor-args "$AGENCE_ADDRESS" "$AGENCE_TREASURY_ADDRESS" \
    --etherscan-api-key "${!ETHERSCAN_API_KEY_VAR}" --verify \
    > "data/$NETWORK_NAME/agence_gigs.json" || error_exit "Agence Gigs deployment failed"

# Extract Agence Gigs address
AGENCE_GIGS_ADDRESS=$(jq -r .deployedTo "./data/$NETWORK_NAME/agence_gigs.json")
echo "Agence Gigs deployed to $AGENCE_GIGS_ADDRESS on $NETWORK_NAME."

# Initialize Agence with Treasury and Gigs addresses
echo "Initializing Agence..."
cast send "$AGENCE_ADDRESS" --quiet \
    --rpc-url "${!RPC_URL_VAR}" \
    "init(address,address)()" \
    "$AGENCE_TREASURY_ADDRESS" "$AGENCE_GIGS_ADDRESS" \
    --account deployer || error_exit "Agence initialization failed"

echo "Deployment complete on $NETWORK_NAME ✨"
