#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/governance/governance.wasm ./out/governance.wasm
cp ../target/near/governance/governance_abi.json ./out/governance_abi.json