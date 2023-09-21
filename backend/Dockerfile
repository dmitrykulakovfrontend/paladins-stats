FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start:docker" ]