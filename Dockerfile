FROM node:24.8-alpine3.21

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --production

COPY views /app/views/
COPY Library /app/

RUN mkdir log
RUN touch log/access.log
RUN mkdir filestore
RUN mkdir filestore/books


CMD [ "yarn", "start_docker" ]
