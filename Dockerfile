FROM node:alpine as app

WORKDIR /app

# Add source
COPY modules-fe /app/modules-fe

# Build React website
RUN cd /app/modules-fe \
 && npm install \
 && npm run build