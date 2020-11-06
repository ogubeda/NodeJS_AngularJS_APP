FROM node:latest

RUN mkdir /app
WORKDIR /app
COPY package*.json /app/

EXPOSE 3000

RUN npm install

CMD ["gulp"]