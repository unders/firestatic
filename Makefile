PROJECT :=project/base
THEME :=autumn

GITTAG :=v0.0.3

BUILDSTAMP :=$(shell date -u '+%Y-%m-%dT%I:%M%p')
GITHASH :=$(shell git rev-parse HEAD)
VERSION := $(PROJECT)/config/deployed-version.txt
PREVIOUS := $(PROJECT)/config/deployed-previous.txt
DEPLOYED_VERSION := $(PROJECT)/public/deployed-version.txt

.PHONY: help
help:
	@echo " - project dir: $(PROJECT); theme: $(THEME) -"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	## Install: https://imageoptim.com/mac
	## go get github.com/cortesi/modd/cmd/modd
	## brew install imagemagick graphicsmagick
	## brew install openssl
	## npm install -g imageoptim-cli
	## npm install -g typescript
	## npm install -g firebase-tools
	npm install

.PHONY: start
start: ## start dev environment
	@modd -f $(PROJECT)/config/modd.dev.conf

.PHONY: release
release: ## create a release
	@cp support/env.prod.ts src/env/env.ts
	@rm -rf $(PROJECT)/public
	@./bin/clean.sh $(PROJECT)
	@rsync -avz --delete --exclude 'assets/css' --exclude 'assets/js' websites/ $(PROJECT)/public
	@node_modules/.bin/node-sass --output-style compressed --output ./$(PROJECT)/public/assets/css ./sass/$(THEME)
	@node_modules/.bin/webpack --config $(PROJECT)/config/webpack.dev.config.js
	@node_modules/.bin/webpack --config $(PROJECT)/config/webpack.prod.config.js
	@./bin/hasher.sh $(PROJECT)
	@cp $(VERSION) $(PREVIOUS)
	@echo tag:$(GITTAG) time:$(BUILDSTAMP) githash:$(GITHASH) project:$(PROJECT) theme:$(THEME) > $(VERSION)
	@cp $(VERSION) $(DEPLOYED_VERSION)
	@cp support/env.dev.ts src/env/env.ts

.PHONY: tree
tree: ## lists the file structure
	@tree -I 'dist|node_modules|build|'

.PHONY: crop
crop: ## crop images
	$(PROJECT)/bin/crop.sh

.PHONY: convert
convert: ## convert and compress images
	$(PROJECT)/bin/convert.sh

.PHONY: identify
identify: ## show image dimensions
	$(PROJECT)/bin/identify.sh

.PHONY: log
log: ## show git log
	@git log --graph --oneline --decorate
