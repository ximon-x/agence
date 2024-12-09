include .env

deploy:
	@echo "Deploying to Base Sepolia"
	forge create src/Agence.sol:Agence --json \
		--rpc-url ${BASE_SEPOLIA_RPC} \
		--account ximon --broadcast \
		--constructor-args ${BASE_SEPOLIA_ENDPOINT} ${DEPLOYER} \
		> data/base_address.json
	
	@echo 

	@echo "Deploying to Polygon Amoy"
	forge create src/Agence.sol:Agence --json \
		--rpc-url ${POLYGON_AMOY_RPC} \
		--account ximon --broadcast \
		--constructor-args ${POLYGON_AMOY_ENDPOINT} ${DEPLOYER} \
		> data/polygon_address.json

	@echo "Deployment complete"