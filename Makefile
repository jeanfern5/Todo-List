build-docker-server:
	docker build -t node-server .


build-docker-client:
	docker build -t node-client .

run-docker-server:
	docker run -u 0 -it -p 8080:8080  -v $(shell pwd):/workspace node bash


run-docker-client:
	docker run -u 0 -it -p 3000:3000 -v $(shell pwd):/workspace node bash


