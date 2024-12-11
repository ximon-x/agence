.PHONY: help
help:
	@echo "Available targets:"
	@echo "  deploy       	- Deploy to Base Sepolia and Polygon Amoy, and set peers"
	@echo "  deploy-base  	- Deploy only to Base Sepolia"
	@echo "  deploy-polygon - Deploy only to Polygon Amoy"
	@echo "  set-peers    	- Set peer configurations between Base Sepolia and Polygon Amoy"
	@echo "  clean        	- Remove deployment artifacts"

# Ensure the deploy script is executable
deploy.sh:
	@chmod +x deploy.sh

# Load environment variables
include .env

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
	# Validate required environment variables
	@if [ -z "$(POLYGON_AMOY_ENDPOINT_ID)" ]; then \
		echo "Error: POLYGON_AMOY_ENDPOINT_ID is not set"; \
		exit 1; \
	fi
	@if [ -z "$(BASE_SEPOLIA_ENDPOINT_ID)" ]; then \
		echo "Error: BASE_SEPOLIA_ENDPOINT_ID is not set"; \
		exit 1; \
	fi

	# Load contract addresses
	$(eval BASE_SEPOLIA_AGENCE_ADDRESS=$(jq -r .deployedTo "./data/base_sepolia/agence.json"))
	$(eval POLYGON_AMOY_AGENCE_ADDRESS=$(jq -r .deployedTo "./data/polygon_amoy/agence.json"))

	# Convert contract addresses to bytes32
	$(eval POLYGON_AMOY_CONTRACT_BYTES32=$(shell cast --to-bytes32 $(POLYGON_AMOY_AGENCE_ADDRESS)))
	$(eval BASE_SEPOLIA_CONTRACT_BYTES32=$(shell cast --to-bytes32 $(BASE_SEPOLIA_AGENCE_ADDRESS)))

	@echo "Setting Peer for Base Sepolia"
	cast send $(BASE_SEPOLIA_AGENCE_ADDRESS) --json \
		--rpc-url $(BASE_SEPOLIA_RPC) \
		"setPeer(uint32, bytes32)" $(POLYGON_AMOY_ENDPOINT_ID) $(POLYGON_AMOY_CONTRACT_BYTES32) \
		--account deployer

	@echo "Setting Peer for Polygon Amoy"
	cast send $(POLYGON_AMOY_AGENCE_ADDRESS) --json \
		--rpc-url $(POLYGON_AMOY_RPC) \
		"setPeer(uint32, bytes32)" $(BASE_SEPOLIA_ENDPOINT_ID) $(BASE_SEPOLIA_CONTRACT_BYTES32) \
		--account deployer

	@echo "\n\n============= Peer Configuration Complete ✨ ============="

# Clean up deployment artifacts
.PHONY: clean
clean:
	@rm -rf data/base_sepolia data/polygon_amoy
	@echo "Cleaned up deployment artifacts"
