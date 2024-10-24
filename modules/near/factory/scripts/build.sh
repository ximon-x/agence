#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/factory/factory.wasm ./out/factory.wasm
cp ../target/near/factory/factory_abi.json ./out/factory_abi.json

cp ../target/near/governance/governance.wasm ./out/governance.wasm
cp ../target/near/staking/staking.wasm ./out/staking.wasm
cp ../target/near/gigs/gigs.wasm ./out/gigs.wasm