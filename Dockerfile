FROM debian:bullseye-slim
WORKDIR /db
RUN apt update && apt install -y curl ripgrep unzip sqlite3
COPY build.sh ./
COPY import ./
RUN ./build.sh

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=0 /db/food.db .