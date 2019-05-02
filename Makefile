build-docker:
	docker build -t todo_container .

run-docker-server:
	docker run -u 0 -it -p 8080:8080  -v $(shell pwd):/workspace todo_container bash

run-docker-client:
	docker run -u 0 -it -p 80:5000 -v $(shell pwd):/workspace todo_container bash

run-server:
	cd server && \
	npm install && \
	npm start

run-client:
	cd client && \
	npm install && \
	npm --max_old_space_size=8192 run build && \
	npm install -g serve && \
	serve -s build



