
FROM node
#RUN mkdir /workspace 
RUN mkdir /database
RUN apt-get update && apt-get install -y \
	vim \
	git

RUN \
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
  echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' > /etc/apt/sources.list.d/mongodb.list && \
  apt-get update && \
  apt-get install -y --allow-unauthenticated mongodb-org && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
