FROM node:14.8.0-alpine3.10 as builder

ARG HOME=/app

ARG BUILD_MODE

ENV TZ=Europe/Kiev

WORKDIR $HOME
COPY package.json $HOME/package.json
COPY yarn.lock $HOME/yarn.lock

RUN apk --no-cache add --virtual builds-deps build-base \
	&& yarn cache clean \
	&& yarn install --network-timeout 1000000

COPY . $HOME

RUN echo 'HELLO' \
	# && yarn test \
	&& yarn build
#	&& yarn build:client --build_mode=$BUILD_MODE \
	# && rm -rf $HOME/node_modules

RUN mkdir -m 777 ./build/nginx



EXPOSE 3000
USER node

CMD /bin/sh clean.sh > /dev/null 2>&1 && yarn start:server
