#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/staking/staking.wasm ./out/staking.wasm
cp ../target/near/staking/staking_abi.json ./out/staking_abi.json