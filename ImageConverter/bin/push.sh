#!/bin/sh

# REGISTRY_IP=192.168.1.61:5000
REGISTRY_IP=kavanet.io:5000
APP_NAME=imageconverter

clear && \
docker build -f ./Dockerfile -t $APP_NAME . && \
docker tag $APP_NAME $REGISTRY_IP/$APP_NAME && \
docker push $REGISTRY_IP/$APP_NAME
