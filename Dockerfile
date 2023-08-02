FROM node

WORKDIR /somename

COPY . .

RUN apt-get update
RUN npm install && npm i -g @nestjs/cli

EXPOSE 3000

CMD npm start
