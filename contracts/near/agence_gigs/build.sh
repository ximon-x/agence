#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/agence_gigs/agence_gigs.wasm ./out/gigs_contract.wasm
cp ../target/near/agence_gigs/agence_gigs_abi.json ./out/gigs_contract_abi.json