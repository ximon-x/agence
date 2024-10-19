#!/bin/bash
set -e

cargo near build --no-docker
mkdir -p ./out

cp ../target/near/gigs/gigs.wasm ./out/gigs.wasm
cp ../target/near/gigs/gigs_abi.json ./out/gigs_abi.json