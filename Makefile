.PHONY: install test-keys build start test clean-test-keys stop

TEST_KEY := $(shell solana-keygen pubkey ./tests/test-key.json)

all: install test-keys build start test clean-test-keys stop

install:
	yarn install

test-keys:
	anchor build
	# LC_ALL=C find programs src -type f -exec sed -i '' -e "s/GSnSv5PMGDLdU6SZ48rHq5dVBUTz6rtjj2pfWTAnT587/$$(solana-keygen pubkey ./target/deploy/mom_staker-keypair.json)/g" {} +
	anchor build

build:
	anchor build
	yarn idl:generate
	rm -fr dist/ && npx tsc -P tsconfig.cjs.json && npx tsc -P tsconfig.esm.json

start:
	solana-test-validator --url https://api.devnet.solana.com \
		--clone metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s --clone PwDiXFxQsGra4sFFTT8r1QWRMd4vfumiWC1jfWNfdYT \
		--clone mgr99QFMYByTqGPWmNqunV7vBLmWWXdSrHUfV8Jf3JM --clone ojLGErfqghuAqpJXE1dguXF7kKfvketCEeah8ig6GU3 \
		--bpf-program ./target/deploy/neo_contract-keypair.json ./target/deploy/neo_contract.so \
		--reset --quiet & echo $$! > validator.PID
	sleep 10
	solana-keygen pubkey ./tests/test-key.json
	solana airdrop 1000 9KmsSiG8vRKrsuZcLbgpzu6bXfF6TpntwcuLQo1a9Shh --url http://localhost:8899
	solana airdrop 1000 $(TEST_KEY) --url http://localhost:8899
	npx ts-node scripts/createPlatform.ts

test:
	anchor test --skip-local-validator --skip-build --skip-deploy --provider.cluster localnet

clean-test-keys:
	# LC_ALL=C find programs src -type f -exec sed -i '' -e "s/$$(solana-keygen pubkey ./target/deploy/mom_staker-keypair.json)/GSnSv5PMGDLdU6SZ48rHq5dVBUTz6rtjj2pfWTAnT587/g" {} +

stop: validator.PID
	kill `cat $<` && rm $<