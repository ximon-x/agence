test-gigs:
	@cd gigs && cargo test

test-factory:
	@cd factory && cargo test

test-staking:
	@cd staking && cargo test

test-governance:
	@cd governance && cargo test

test: test-gigs test-staking test-governance test-factory


build-gigs:
	@cd gigs && ./build.sh

build-factory:
	@cd factory && ./scripts/build.sh

build-staking:
	@cd staking && ./build.sh

build-governance:
	@cd governance && ./build.sh

build: build-gigs build-staking build-governance build-factory


deploy: build
	@./factory/scripts/deploy.sh