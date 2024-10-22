test-gigs:
	@cd gigs && cargo test

test-staking:
	@cd staking && cargo test

test-governance:
	@cd governance && cargo test

test: test-gigs test-staking test-governance


build-gigs:
	@cd gigs && ./scripts/build.sh

build-staking:
	@cd staking && ./scripts/build.sh

build-governance:
	@cd governance && ./scripts/build.sh

build: build-gigs build-staking build-governance