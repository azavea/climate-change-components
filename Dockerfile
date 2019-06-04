ARG NODE_VERSION

FROM node:${NODE_VERSION}

RUN set -ex \
	&& apt-get update -yq \
	&& karmaDeps=' \
		g++ \
		chromium \
	' \
	&& apt-get install -y ${karmaDeps}

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --pure-lockfile