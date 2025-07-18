# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:24-alpine

ARG NUXT_PUBLIC_STUDIO_TOKENS
ARG REDIS_HOST
ARG REDIS_PASSWORD
ARG MINIO_URL
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG CHROME_TOKEN

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

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install pnpm
RUN npm install -g pnpm

# Step 4: Copy the package.json and pnpm-lock.yaml (or pnpm-workspace.yaml if you use workspaces)
# files into the working directory
COPY package.json pnpm-lock.yaml ./

# Step 5: Install dependencies using pnpm.
# The --frozen-lockfile option ensures that the installed packages match the lockfile.
RUN pnpm install --frozen-lockfile

# Step 6: Copy the rest of the application code into the working directory
COPY . .

# Step 7: Build the application if needed. This step can be omitted if you're running a development server.
RUN pnpm run build

# Step 8: Expose the port that Nuxt will run on
ENV EXPOSE 3000

# Step 10: Build the application
CMD ["node", ".output/server/index.mjs"]
