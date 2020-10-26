FROM node:14-alpine
WORKDIR /usr/src/flights-management/server
COPY ./server/package*.json ./
RUN npm i
WORKDIR /usr/src/flights-management/client
COPY ./client/package*.json ./
RUN npm i
WORKDIR /usr/src/flights-management
COPY . .
WORKDIR /usr/src/flights-management/client
RUN npm run build
WORKDIR /usr/src/flights-management/server
EXPOSE 3000
CMD ["npm", "start"]