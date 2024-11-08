FROM node:21-alpine as runner
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci
COPY . .
RUN npm run gulp
EXPOSE 3000

CMD ["node", "server.js"]
