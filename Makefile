
MOCHA_OPTS= --check-leaks
REPORTER = spec

test: test-nonet

test-all: test-nonet test-net

test-nonet:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--globals setImmediate,clearImmediate \
		$(MOCHA_OPTS) \
		test/test-*.js

test-net:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		---reporter $(REPORTER) \
		--globals setImmediate,clearImmediate \
		$(MOCHA_OPTS) \
		test/net-test-*.js

clean: clean-docs

clean-docs:
	rm -rf docs/

docs: clean-docs
	docco --layout linear {index.js,lib/*.js}
	git subtree split --prefix docs -b gh-pages

publish-docs: docs
	git subtree push --prefix docs github gh-pages

publish:
	git push github --all; git push github --tags; git push bitbucket --all; git push bitbucket --tags
	npm publish

.PHONY: test
