FROM node:lts
WORKDIR /usr/src/app
COPY dist .
COPY package.json .
EXPOSE 8100
CMD yarn install && \
    yarn knex migrate:latest &&\
    yarn knex seed:run &&\
    node server.js
