# Base image
FROM ubuntu:22.04

# Install LibreOffice headless + dependencies
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libreoffice-core \
    libreoffice-writer \
    libreoffice-impress \
    libreoffice-common \
    imagemagick \
 && rm -rf /var/lib/apt/lists/*

# Use a lightweight Node.js image for your app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Final image: combine LibreOffice layer + Node app
FROM ubuntu:22.04
COPY --from=0 /usr/lib/libreoffice /usr/lib/libreoffice
COPY --from=0 /usr/share/libreoffice /usr/share/libreoffice
COPY --from=1 /app /app

WORKDIR /app
EXPOSE 3000
CMD ["node", "index.js"]
