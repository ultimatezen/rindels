BIN = ./node_modules/.bin

.PHONY: test run

# Will add datastores later
all: deps


# Will add more deps later
deps: deps-npm


deps-npm:
	@npm install .


test: test-lint test-mocha

test-lint:
	./node_modules/.bin/jshint .

test-mocha:
#	NODE_ENV=unittest && ./node_modules/.bin/mocha --check-leaks -R
	node --harmony ./node_modules/.bin/mocha --check-leaks

clean:
	rm -rf ./node_modules/
