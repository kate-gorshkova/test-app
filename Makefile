DOCKER__FRONT_APP_PROJECT := front-app-project
DOCKER__FRONT_APP_IMAGE_VERSION := 0.0.1
DOCKER__FRONT_APP_IMAGE_NAME := frontend-app

.PHONY: dev--front-app-run
dev--front-app-run:
	DOCKER__IMAGE_VERSION=$(DOCKER__FRONT_APP_IMAGE_VERSION) \
	DOCKER__IMAGE_NAME=$(DOCKER__FRONT_APP_IMAGE_NAME) \
	docker-compose -p $(DOCKER__FRONT_APP_PROJECT) -f docker-compose.yaml up -d

.PHONY: dev--front-app-image-build
dev--front-app-image-build:
	docker build -t $(DOCKER__FRONT_APP_IMAGE_NAME):$(DOCKER__FRONT_APP_IMAGE_VERSION) .

.PHONY: dev--front-app-image-push
dev--front-app-image-push:
	docker push $(DOCKER__FRONT_APP_IMAGE_NAME):$(DOCKER__FRONT_APP_IMAGE_VERSION)

.PHONY: dev--front-app-down
dev--front-app-down:
	DOCKER__IMAGE_VERSION=$(DOCKER__FRONT_APP_IMAGE_VERSION) \
	DOCKER__IMAGE_NAME=$(DOCKER__FRONT_APP_IMAGE_NAME) \
	docker-compose -p $(DOCKER__FRONT_APP_PROJECT) down
