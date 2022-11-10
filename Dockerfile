# choose operating system
FROM node:16-alpine3.15

# set timezone
ENV TZ=America/Chicago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# set docker work directory
WORKDIR /

# Explicitly pull in this directory
COPY ./src/api ./src/api
COPY ./package.json ./package.json
COPY ./.env ./.env
COPY ./src/db/models ./src/db/models

RUN yarn install

EXPOSE 1128
CMD ["yarn", "run", "server-dev"]