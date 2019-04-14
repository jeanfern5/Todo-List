build-docker:
	docker build -t node .

run-docker:
	docker run -u 0 -it -p 8080:8080 -p 3000:3000 -p 5000:5000  -v $(shell pwd):/workspace node bash
