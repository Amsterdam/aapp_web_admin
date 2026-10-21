.PHONY: manifests deploy build

UID:=$(shell id --user)
GID:=$(shell id --group)

dc = docker compose
run = $(dc) run --rm -u ${UID}:${GID}

ENVIRONMENT ?= local
CHART ?= oci://crsharedaksweu9x4d.azurecr.io/platform/helm-generic-application
CHART_VERSION ?= 0.0.0-main
HELM_ARGS = ${CHART} --version ${CHART_VERSION} \
	-f manifests/values.yaml \
	-f manifests/env/${ENVIRONMENT}.yaml \
	--set image.tag=${VERSION}

REGISTRY ?= localhost:5000
REPOSITORY ?= Amsterdam-App/aapp_web_admin
VERSION ?= latest

build:
	$(dc) build

dev:
	$(run) --service-ports dev
	
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