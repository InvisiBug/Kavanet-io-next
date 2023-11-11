#!/bin/sh

clear && cd helm && \
helm upgrade image-converter . \
--install \
--namespace kavanet-io \
