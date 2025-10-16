# syntax=docker/dockerfile:1

FROM node:22-alpine
WORKDIR .
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "src/server.js"]
