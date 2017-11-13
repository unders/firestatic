PROJECT := firestatic-base

.PHONY: help
help:
	@echo "Project                        $(PROJECT)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: deploy
deploy: ## deploy website to firebase project: firestatic-base
	firebase use $(PROJECT)
	firebase deploy --only=hosting


.PHONY: check
check: ## check deployed website
	curl -i https://firestatic-base.firebaseapp.com/
	curl -i https://firestatic-base.firebaseapp.com/404-not-there
	curl -i https://firestatic-base.firebaseapp.com/deployed-version.txt
