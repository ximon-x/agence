#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/agence_staking/agence_staking.wasm ./out/staking_contract.wasm
cp ../target/near/agence_staking/agence_staking_abi.json ./out/staking_contract_abi.json