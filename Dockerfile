# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:24-alpine

ARG NUXT_PUBLIC_STUDIO_TOKENS
ARG REDIS_HOST
ARG REDIS_PASSWORD
ARG MINIO_URL
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG CHROME_TOKEN

# Nitro
ENV NITRO_PRESET node-server
ENV NODE_OPTIONS --max-old-space-size=4096

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

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with verbose logging
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

# Step 9: Expose the port that Nuxt will run on
ENV EXPOSE 3000

# Step 10: Start the application
CMD ["node", ".output/server/index.mjs"]
