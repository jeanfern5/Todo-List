build-docker:
	docker build -t node .

run-docker-client:
	docker run -u 0 -it -p 3000:3000 -v $(shell pwd):/workspace  node bash

run-docker-server:
	docker run -u 0 -it -p 8080:8080 -v $(shell pwd):/workspace  node bash

run-docker:
	docker run -u 0 -it -p 8080:8080 -p 3000:3000 -v $(shell pwd):/workspace node bash

run-docker-all-ports:
	docker run -u 0 -it --net=host -v $(shell pwd):/workspace node bash
