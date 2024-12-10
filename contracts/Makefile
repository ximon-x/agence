include .env

init:
	$(eval BASE_SEPOLIA_CONTRACT_ADDRESS=$(shell jq -r .deployedTo ./data/base_sepolia_address.json))
	$(eval POLYGON_AMOY_CONTRACT_ADDRESS=$(shell jq -r .deployedTo ./data/polygon_amoy_address.json))

	$(eval BASE_SEPOLIA_CONTRACT_BYTES32=$(shell cast --to-bytes32 ${BASE_SEPOLIA_CONTRACT_ADDRESS}))
	$(eval POLYGON_AMOY_CONTRACT_BYTES32=$(shell cast --to-bytes32 ${POLYGON_AMOY_CONTRACT_ADDRESS}))

	@echo "Setting Peer for Base Sepolia"
	cast send ${BASE_SEPOLIA_CONTRACT_ADDRESS} --json \
		--rpc-url ${BASE_SEPOLIA_RPC} \
		"setPeer(uint32, bytes32)" ${POLYGON_AMOY_ENDPOINT_ID} ${POLYGON_AMOY_CONTRACT_BYTES32} \
		--account deployer \
		| jq

	@echo "Setting Peer for Polygon Amoy"
	cast send ${POLYGON_AMOY_CONTRACT_ADDRESS} --json \
		--rpc-url ${POLYGON_AMOY_RPC} \
		"setPeer(uint32, bytes32)" ${BASE_SEPOLIA_ENDPOINT_ID} ${BASE_SEPOLIA_CONTRACT_BYTES32} \
		--account deployer \
		| jq

deploy:
	@echo "Deploying to Base Sepolia"
	forge create src/Agence.sol:Agence --json \
		--rpc-url ${BASE_SEPOLIA_RPC} \
		--account deployer --broadcast \
		--constructor-args ${BASE_SEPOLIA_ENDPOINT} ${DEPLOYER} \
		--etherscan-api-key ${BASESCAN_API_KEY} --verify \
		> data/base_sepolia_address.json

	@echo "Deploying to Polygon Amoy"
	forge create src/Agence.sol:Agence --json \
		--rpc-url ${POLYGON_AMOY_RPC} \
		--account deployer --broadcast \
		--constructor-args ${POLYGON_AMOY_ENDPOINT} ${DEPLOYER} \
		--etherscan-api-key ${POLYGONSCAN_API_KEY} --verify \
		> data/polygon_amoy_address.json
	
	$(eval BASE_SEPOLIA_CONTRACT_ADDRESS=$(shell jq -r .deployedTo ./data/base_sepolia_address.json))
	$(eval POLYGON_AMOY_CONTRACT_ADDRESS=$(shell jq -r .deployedTo ./data/polygon_amoy_address.json))
	@echo 

	@echo "Agence deployed to ${BASE_SEPOLIA_CONTRACT_ADDRESS} on Base Sepolia."
	@echo "Agence deployed to ${POLYGON_AMOY_CONTRACT_ADDRESS} on Polygon Amoy."

	@echo "Deployment complete ✨"