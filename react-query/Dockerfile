FROM node:14.18.1

WORKDIR /source-react

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY .env ./.env
ADD public ./public
ADD tsconfig.json ./tsconfig.json
ADD craco.config.js ./craco.config.js
COPY src ./src


CMD npm start


