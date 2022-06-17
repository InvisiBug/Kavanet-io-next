#!/bin/sh

REGISTRY_IP=192.168.1.61:5000
APP_NAME=kavanet-io

docker build -f ./Dockerfile -t $APP_NAME . && \
docker tag $APP_NAME $REGISTRY_IP/$APP_NAME && \
docker push $REGISTRY_IP/$APP_NAME
