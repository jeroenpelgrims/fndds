FROM debian:bullseye-slim
WORKDIR /db
RUN apt update && apt install -y curl ripgrep unzip sqlite3
COPY build.sh ./
COPY import ./
RUN ./build.sh

FROM node:18
WORKDIR /api
COPY api .
RUN npm ci
RUN npm run build

FROM node:18-slim
WORKDIR /app
COPY --from=0 /db/food.db .
COPY --from=1 /api/dist .
COPY --from=1 /api/package.json .

CMD DATABASE_FILE=./food.db node server.js