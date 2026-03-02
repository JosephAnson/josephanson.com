# === Build stage (secrets available, discarded after build) ===
FROM node:24-alpine AS build

ARG NUXT_PUBLIC_STUDIO_TOKENS
ARG REDIS_HOST
ARG REDIS_PASSWORD
ARG MINIO_URL
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG CHROME_TOKEN

ENV NITRO_PRESET=node-server
ENV NODE_OPTIONS=--max-old-space-size=4096

ENV NUXT_PUBLIC_STUDIO_TOKENS=${NUXT_PUBLIC_STUDIO_TOKENS}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}
ENV MINIO_URL=${MINIO_URL}
ENV MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
ENV MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
ENV CHROME_TOKEN=${CHROME_TOKEN}

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    sqlite-dev \
    && ln -sf python3 /usr/bin/python

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# === Runtime stage (clean, no secrets in any layer) ===
FROM node:24-alpine

WORKDIR /app

COPY --from=build /app/.output .output

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
