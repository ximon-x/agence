#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/dao/dao.wasm ./out/dao.wasm
cp ../target/near/dao/dao_abi.json ./out/dao_abi.json