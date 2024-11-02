#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/agence_governance/agence_governance.wasm ./out/governance_contract.wasm
cp ../target/near/agence_governance/agence_governance_abi.json ./out/governance_contract_abi.json