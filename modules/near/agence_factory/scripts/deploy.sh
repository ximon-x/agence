#!/bin/bash
set -e

echo "=== Deploying Contracts ==="

factory_wasm="agence_factory/out/factory_contract.wasm"

PUBLIC_KEY="ed25519:CZqFUro8RgE2rurn3A8sqHNrKmKQWcxrLFwMsF4wpdGy"

echo "Deploying the factory contract"

near contract deploy agence.testnet \
    use-file $factory_wasm \
    without-init-call \
    network-config testnet \
    sign-with-keychain \
    send

echo "Deploying the subcontracts"

near contract call-function \
    as-transaction agence.testnet deploy_contracts \
    json-args '{"public_key": "'$PUBLIC_KEY'"}' \
    prepaid-gas 100TGAS \
    attached-deposit 10NEAR \
    sign-as agence.testnet \
    network-config testnet \
    sign-with-keychain \
    send

near contract call-function \
    as-transaction governance.agence.testnet init \
    json-args '{
        "staking_account": "staking.agence.testnet",
        "gigs_account": "gigs.agence.testnet"
    }' \
    prepaid-gas 5TGAS \
    attached-deposit 0NEAR \
    sign-as agence.testnet \
    network-config testnet \
    sign-with-keychain \
    send


near contract call-function \
    as-transaction staking.agence.testnet init \
    json-args '{
        "governance_account": "governance.agence.testnet",
        "gigs_account": "gigs.agence.testnet"
    }' \
    prepaid-gas 5TGAS \
    attached-deposit 0NEAR \
    sign-as agence.testnet \
    network-config testnet \
    sign-with-keychain \
    send

near contract call-function \
    as-transaction gigs.agence.testnet init \
    json-args '{
        "governance_account": "governance.agence.testnet",
        "staking_account": "staking.agence.testnet"
    }' \
    prepaid-gas 5TGAS \
    attached-deposit 0NEAR \
    sign-as agence.testnet \
    network-config testnet \
    sign-with-keychain \
    send
