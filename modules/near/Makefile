test-gigs:
	@cd agence_gigs && cargo test

test-factory:
	@cd agence_factory && cargo test

test-staking:
	@cd agence_staking && cargo test

test-governance:
	@cd agence_governance && cargo test

test: test-gigs test-staking test-governance test-factory


build-gigs:
	@cd agence_gigs && ./build.sh

build-factory:
	@cd agence_factory && ./scripts/build.sh

build-staking:
	@cd agence_staking && ./build.sh

build-governance:
	@cd agence_governance && ./build.sh

build: build-gigs build-staking build-governance build-factory


deploy: build
	@./agence_factory/scripts/deploy.sh