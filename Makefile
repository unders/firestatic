PROJECT :=base

.PHONY: help
help:
	@echo "           - project: $(PROJECT) -"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	## go get github.com/cortesi/modd/cmd/modd
	## npm install -g typescript
	## npm install -g firebase-tools
	npm install

.PHONY: start
start: ## start dev environment
	@cp support/env.dev.ts src/env/env.ts
	@modd -f project/$(PROJECT)/config/modd.dev.conf


.PHONY: release
release: ## create a release
	@cp support/env.prod.ts src/env/env.ts
	@node_modules/.bin/node-sass --output-style compressed --output ./project/$(project)/public/assets/css ./sass
	@node_modules/.bin/webpack --config project/$(PROJECT)/config/webpack.dev.config.js
	# @node_modules/.bin/webpack --config project/$(PROJECT)/config/webpack.prod.config.js

	##
	@cp support/env.dev.ts src/env/env.ts

.PHONY: tree
tree: ## lists the file structure
	@tree -I 'dist|node_modules|build|'

.PHONY: log
log: ## show git log
	@git log --graph --oneline --decorate
