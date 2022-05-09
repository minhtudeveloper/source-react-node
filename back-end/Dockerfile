FROM node:14.18.1

WORKDIR /source-node

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY ./ ./

CMD yarn start



