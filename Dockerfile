FROM node:20-alpine as app

# Add source
COPY . /code

# Build React website
RUN cd /code \
    && npm ci \
    && npm run build

##################################################
FROM nginx:alpine as deploy

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
    && apk add curl

# Copy sources to container
COPY --from=app /code/build /app/beheer/
COPY ./nginx.conf /etc/nginx/nginx.conf