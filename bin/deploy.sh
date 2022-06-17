#!/bin/sh

clear && cd helm && \
helm upgrade kavanet-io . \
--install \
--namespace kavanet-io \
-f values/live.yaml
