PROJECT :=base

.PHONY: help
help:
	@echo "Current project: $(PROJECT)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	## go get github.com/cortesi/modd/cmd/modd
	## npm install -g typescript
	## npm install -g firebase-tools
	npm install

.PHONY: start
start: ## starts dev environment
	@modd -f project/$(PROJECT)/config/modd.dev.conf

.PHONY: tree
tree: ## lists the projects file structure
	@tree -I 'dist|node_modules|build|'

.PHONY: log
log: ## show git log
	@git log --graph --oneline --decorate
