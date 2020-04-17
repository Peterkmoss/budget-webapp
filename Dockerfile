FROM node:12-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i --silent

COPY . .

CMD ["npm", "start"]