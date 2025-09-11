FROM node:24.8-alpine3.21

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --production

COPY view /app/
COPY Library /app/


CMD [ "yarn", "start_docker" ]
