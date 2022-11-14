#Built from MacOS Env: 
#docker build --platform linux/amd64 -t cheeseria:latest .

FROM node:18-alpine
ENV PORT=3000

WORKDIR /app
COPY package.json .
# Fixes issue: cannot access public/app js file
RUN npm config set unsafe-perm true 
RUN npm install --force

COPY /src ./src
COPY tsconfig.client.json .
COPY tsconfig.server.json .
COPY webpack.config.js . 
COPY babel.config.js . 
COPY /public ./public
COPY /resources ./resources
RUN npm run test:client:unit && npm run test:server:unit
RUN npm run build

EXPOSE 3000
USER root
CMD [ "node", "dist/server.js" ]
