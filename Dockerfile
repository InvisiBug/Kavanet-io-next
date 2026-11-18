FROM node AS builder

WORKDIR /app
COPY . .

# ENV VITE_API=https://api.winterflowspace.com

RUN npm install
RUN npm run build

FROM node
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY server.mjs ./server.mjs
EXPOSE 80
CMD ["node", "server.mjs"]
