#!/bin/bash
set -e

mkdir -p ./out
cp ../target/near/agence_governance/agence_governance.wasm ./out/governance_contract.wasm
cp ../target/near/agence_staking/agence_staking.wasm ./out/staking_contract.wasm
cp ../target/near/agence_gigs/agence_gigs.wasm ./out/gigs_contract.wasm

cargo near build --no-docker

cp ../target/near/agence_factory/agence_factory.wasm ./out/factory_contract.wasm
cp ../target/near/agence_factory/agence_factory_abi.json ./out/factory_abi.json
