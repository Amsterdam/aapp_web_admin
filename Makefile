.PHONY: manifests deploy

UID:=$(shell id --user)
GID:=$(shell id --group)

dc = docker-compose
run = $(dc) run --rm -u ${UID}:${GID}

ENVIRONMENT ?= local
HELM_ARGS = oci://${REGISTRY}/amsterdam/helm-generic-application --version 1.12.1  \
	-f manifests/values.yaml \
	-f manifests/env/${ENVIRONMENT}.yaml \
	--set image.tag=${VERSION}

REGISTRY ?= localhost:5000
REPOSITORY ?= Amsterdam-App/aapp_web_admin
VERSION ?= latest

build:
	$(dc) build

test:
	echo "No tests to run."

push:
	$(dc) push

manifests:
	@helm template admin $(HELM_ARGS) $(ARGS)

deploy: manifests
	helm upgrade --install admin $(HELM_ARGS) $(ARGS)

clean:
	$(dc) down -v --remove-orphans	