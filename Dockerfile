FROM node:20-alpine as app

# Add source
COPY modules-fe /code/modules-fe

# Build React website
RUN cd /code/modules-fe \
 && npm ci \
 && npm run build

##################################################
FROM nginx:alpine as deploy

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
    && apk add --no-cache postgresql15-client \
    && apk add curl

 # Copy sources to container
COPY --from=app /code/modules-fe/build /app/mbs/
COPY ./nginx.conf /etc/nginx/nginx.conf