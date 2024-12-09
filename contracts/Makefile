include .env

deploy:
	@echo "Deploying to Base"
	forge create src/Counter.sol:Counter --rpc-url ${BASE_SEPOLIA_RPC} --account ximon --broadcast --constructor-args 4
