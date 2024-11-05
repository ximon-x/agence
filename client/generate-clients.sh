#!/bin/sh

set -e

ARTIFACTS="./src/lib/interfaces/algorand/artifacts"
OUT="./src/lib/interfaces/algorand/contract-clients"

mkdir -p "${OUT}/";

npx --yes  @algorandfoundation/algokit-client-generator generate -a "${ARTIFACTS}/agence/Agence.arc32.json" -o "${OUT}/AgenceClient.ts";
npx --yes  @algorandfoundation/algokit-client-generator generate -a "${ARTIFACTS}/agence_governance/AgenceGovernance.arc32.json" -o "${OUT}/AgenceGovernanceClient.ts";
npx --yes  @algorandfoundation/algokit-client-generator generate -a "${ARTIFACTS}/agence_gigs/AgenceGigs.arc32.json" -o "${OUT}/AgenceGigsClient.ts";
npx --yes  @algorandfoundation/algokit-client-generator generate -a "${ARTIFACTS}/agence_staking/AgenceStaking.arc32.json" -o "${OUT}/AgenceStakingClient.ts";