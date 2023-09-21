# This Dockerfile is to deploy backend on hosting, hosting requires to have a dockerfile in a root folder
FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm ci

COPY ./backend ./

EXPOSE 80

CMD [ "npm", "run", "start:docker" ]