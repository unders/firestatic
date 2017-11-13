PROJECT :=base
THEME :=autumn

BUILDSTAMP :=$(shell date -u '+%Y-%m-%dT%I:%M%p')
GITTAG :=v0.0.1
GITHASH :=$(shell git rev-parse HEAD)
VERSION := project/$(PROJECT)/config/deployed-version.txt
PREVIOUS := project/$(PROJECT)/config/deployed-previous.txt
DEPLOYED_VERSION := project/$(PROJECT)/public/deployed-version.txt

.PHONY: help
help:
	@echo "   - project: $(PROJECT); theme: $(THEME) -"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	## go get github.com/cortesi/modd/cmd/modd
	## brew install openssl
	## npm install -g typescript
	## npm install -g firebase-tools
	npm install

.PHONY: start
start: ## start dev environment
	@modd -f project/$(PROJECT)/config/modd.dev.conf

.PHONY: release
release: ## create a release
	@cp support/env.prod.ts src/env/env.ts
	@rm -rf project/$(PROJECT)/public
	@rsync -avz --delete --exclude 'assets/css' --exclude 'assets/js' websites/$(PROJECT)/ project/$(PROJECT)/public
	@node_modules/.bin/node-sass --output-style compressed --output ./project/$(PROJECT)/public/assets/css ./sass/$(THEME)
	@node_modules/.bin/webpack --config project/$(PROJECT)/config/webpack.dev.config.js
	@node_modules/.bin/webpack --config project/$(PROJECT)/config/webpack.prod.config.js
	@./bin/hasher.sh $(PROJECT)
	@cp $(VERSION)  $(PREVIOUS)
	@echo tag:$(GITTAG) time:$(BUILDSTAMP) githash:$(GITHASH) project:$(PROJECT) theme:$(THEME) > $(VERSION)
	@cp $(VERSION) $(DEPLOYED_VERSION)
	@cp support/env.dev.ts src/env/env.ts

.PHONY: tree
tree: ## lists the file structure
	@tree -I 'dist|node_modules|build|'

.PHONY: log
log: ## show git log
	@git log --graph --oneline --decorate
