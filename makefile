PLANTUML_BACKEND_URL = $(shell aws cloudformation describe-stacks --stack-name sam-plantuml | jq '.Stacks[0].Outputs[0].OutputValue')
AWS_WEBSITE_BUCKET = $(shell jq '.[0].ParameterValue' ./aws/cloud-formation/parameters.json)

build-frontend:
	cd frontend; PLANTUML_BACKEND_URL=$(PLANTUML_BACKEND_URL); npm run build

deploy-frontend:
	aws s3 sync ./frontend/dist/ s3://$(AWS_WEBSITE_BUCKET)

show-frontend-ssl-url:
	@echo https://s3.us-west-1.amazonaws.com/$(AWS_WEBSITE_BUCKET)/index.html

release-frontend:
	make build-frontend
	make deploy-frontend
	@echo ========================
	@echo Frontend has been built!
	@echo ========================
	make show-frontend-ssl-url