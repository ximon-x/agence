.PHONY: help
help:
	@echo "Available targets:"
	@echo "  deploy       	- Deploy to Base Sepolia and Polygon Amoy, and set peers"
	@echo "  deploy-local  	- Deploy to Local Anvil Network" 
	@echo "  deploy-base  	- Deploy only to Base Sepolia"
	@echo "  deploy-polygon - Deploy only to Polygon Amoy"
	@echo "  set-peers    	- Set peer configurations between Base Sepolia and Polygon Amoy"
	@echo "  clean        	- Remove deployment artifacts"

# Ensure the deploy script is executable
deploy.sh:
	@chmod +x deploy.sh

# Load environment variables
include .env

# Deploy to Local Anvil Network
.PHONY: deploy-local
deploy-local: deploy.sh
	@NETWORK=anvil ./deploy.sh

# Full deployment to all networks with peer configuration
.PHONY: deploy
deploy: deploy-base deploy-polygon set-peers

# Deploy to Base Sepolia only
.PHONY: deploy-base
deploy-base: deploy.sh
	@NETWORK=base_sepolia ./deploy.sh

# Deploy to Polygon Amoy only
.PHONY: deploy-polygon
deploy-polygon: deploy.sh
	@NETWORK=polygon_amoy ./deploy.sh

# Set peer configurations between networks
.PHONY: set-peers
set-peers:
	@echo "============= Setting Peer Configurations =============="

	$(eval BASE_SEPOLIA_AGENCE_ADDRESS=$(shell jq -r .deployedTo "./data/base_sepolia/agence.json"))
	$(eval POLYGON_AMOY_AGENCE_ADDRESS=$(shell jq -r .deployedTo "./data/polygon_amoy/agence.json"))

	@echo "Base Sepolia Agence Address: $(BASE_SEPOLIA_AGENCE_ADDRESS)"
	@echo "Polygon Amoy Agence Address: $(POLYGON_AMOY_AGENCE_ADDRESS)"

	$(eval POLYGON_AMOY_CONTRACT_BYTES32=$(shell cast --to-bytes32 $(POLYGON_AMOY_AGENCE_ADDRESS)))
	$(eval BASE_SEPOLIA_CONTRACT_BYTES32=$(shell cast --to-bytes32 $(BASE_SEPOLIA_AGENCE_ADDRESS)))

	@echo "\n============= Variables Loaded =============="

	@echo "Setting Peer for Base Sepolia"
	cast send $(BASE_SEPOLIA_AGENCE_ADDRESS) --json \
		--rpc-url $(BASE_SEPOLIA_RPC) \
		"setPeer(uint32, bytes32)" $(POLYGON_AMOY_ENDPOINT_ID) $(POLYGON_AMOY_CONTRACT_BYTES32) \
		--account deployer \
		| jq

	@echo "\n\n"

	@echo "Setting Peer for Polygon Amoy"
	cast send $(POLYGON_AMOY_AGENCE_ADDRESS) --json \
		--rpc-url $(POLYGON_AMOY_RPC) \
		"setPeer(uint32, bytes32)" $(BASE_SEPOLIA_ENDPOINT_ID) $(BASE_SEPOLIA_CONTRACT_BYTES32) \
		--account deployer \
		| jq

	@echo "\n============= Peer Configuration Complete ✨ ============="

# Clean up deployment artifacts
.PHONY: clean
clean:
	@rm -rf data/base_sepolia data/polygon_amoy
	@echo "Cleaned up deployment artifacts"