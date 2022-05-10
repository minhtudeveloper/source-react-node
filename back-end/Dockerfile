FROM node:14.18.1

WORKDIR /source-react

ADD ["package.json", "package-lock.json",  "./"]
RUN npm install

ADD nest-cli.json ./nest-cli.json
ADD .env ./.env
ADD tsconfig.json ./tsconfig.json
ADD tsconfig.build.json ./tsconfig.build.json
COPY src ./src


CMD npm start


