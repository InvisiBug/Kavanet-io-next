# FROM node:16-alpine
# # FROM arm64v8/node
# WORKDIR /app

# COPY package.json yarn.lock ./

# RUN yarn install
# COPY . ./

# ENV NODE_ENV production
# ENV SANITY_PROJECT_ID u8e0al0h
# ENV SANITY_DATASET_NAME production

# RUN yarn build
# EXPOSE 3000

# CMD ["yarn", "start"]


# FROM node:16-alpine
FROM arm64v8/node
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
# COPY ./ ./app

ENV NODE_ENV production
ENV SANITY_PROJECT_ID u8e0al0h
ENV SANITY_DATASET_NAME production

EXPOSE 3000

CMD ["yarn", "start"]