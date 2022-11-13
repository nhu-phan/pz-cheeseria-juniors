FROM node:18-alpine
USER node
ENV PORT=3000

WORKDIR /app
COPY package.json .
RUN npm install --force

COPY /src ./src
COPY tsconfig.client.json .
COPY tsconfig.server.json .
COPY webpack.config.js . 
COPY /public ./public
COPY /resources ./resources

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/server.js" ]
