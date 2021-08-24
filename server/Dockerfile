FROM node:12-alpine

WORKDIR /server

ENV PATH /server/node_modules/.bin:$PATH

COPY package.json /server/package.json
RUN yarn install --silent

CMD ["yarn", "dev"]